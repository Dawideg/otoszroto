using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Reflection;

namespace Api.Features.Common.FilterAndSortFunctions
{
    public static class FilterAndSort
    {
        public static IQueryable<T> ApplyFilters<T>(this IQueryable<T> query, object request)
        {
            if (request == null)
                return query;

            var queryObject = Properties.GetPropValue<object>(request, "QueryObject");

            var parameter = Expression.Parameter(typeof(T), "x");
            var filters = new List<Expression>();

            void Filter(Type type, Expression parameter, object queryObject, List<Expression> filters)
            {
                foreach (var property in queryObject.GetType().GetProperties())
                {
                    var value = property.GetValue(queryObject);
                    if (value == null || value is string stringValue && string.IsNullOrWhiteSpace(stringValue))
                        continue;

                    var entityProperty = type.GetProperty(property.Name, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                    if (entityProperty == null)
                        continue;

                    var propertyAccess = Expression.MakeMemberAccess(parameter, entityProperty);

                    Expression filterExpression;
                    if (entityProperty.PropertyType == typeof(string))
                    {
                        var likeMethod = typeof(DbFunctionsExtensions).GetMethod(nameof(DbFunctionsExtensions.Like), new[] { typeof(DbFunctions), typeof(string), typeof(string) });
                        var efFunctions = Expression.Constant(EF.Functions);
                        filterExpression = Expression.Call(likeMethod, efFunctions, propertyAccess, Expression.Constant($"%{value}%"));
                    }
                    else if (entityProperty.PropertyType == typeof(bool) || entityProperty.PropertyType == typeof(bool?))
                    {
                        filterExpression = Expression.Equal(propertyAccess, Expression.Constant(value));
                    }
                    else if (property.Name.StartsWith("Start", StringComparison.OrdinalIgnoreCase))
                    {
                        filterExpression = Expression.GreaterThanOrEqual(propertyAccess, Expression.Constant(value, entityProperty.PropertyType));
                    }
                    else if (property.Name.StartsWith("End", StringComparison.OrdinalIgnoreCase))
                    {
                        filterExpression = Expression.LessThanOrEqual(propertyAccess, Expression.Constant(value, entityProperty.PropertyType));
                    }
                    //kiedy wykrywa relacje do innego obiektu
                    else if (!entityProperty.PropertyType.IsValueType)
                    {
                        var subParameter = Expression.Parameter(entityProperty.PropertyType, "c");
                        var subFilters = new List<Expression>();
                        //funkcja wywolana dla zagniezdzonego obiektu 
                        Filter(entityProperty.PropertyType, subParameter, value, subFilters);

                        if (subFilters.Any())
                        {
                            var subCombinedFilter = subFilters.Aggregate(Expression.AndAlso);
                            var subLambda = Expression.Lambda(subCombinedFilter, subParameter);
                            filterExpression = Expression.Invoke(subLambda, propertyAccess);
                        }
                        else
                        {
                            continue;
                        }
                    }
                    else if (entityProperty.PropertyType.IsEnum || (Nullable.GetUnderlyingType(entityProperty.PropertyType)?.IsEnum ?? false))
                    {
                        var enumType = Nullable.GetUnderlyingType(entityProperty.PropertyType) ?? entityProperty.PropertyType;
                        var enumValue = Enum.Parse(enumType, value.ToString());
                        filterExpression = Expression.Equal(propertyAccess, Expression.Constant(enumValue));
                    }
                    else
                    {
                        continue;
                    }
                    filters.Add(filterExpression);
                }
            }

            Filter(typeof(T), parameter, queryObject, filters);


            if (filters.Any())
            {
                var combinedFilter = filters.Aggregate(Expression.AndAlso);
                var lambda = Expression.Lambda<Func<T, bool>>(combinedFilter, parameter);
                query = query.Where(lambda);
            }

            return query;
        }


        public static IQueryable<T> ApplySorting<T>(this IQueryable<T> query, object request)
        {
            if (request == null)
                return query;
            //Pobiernaie request.QueruyObject
            var requestQueryObjectProperty = Properties.GetPropValue<object>(request, "QueryObject");

            //Pobieranie sortBy i jego wartosci
            var sortByValue = Properties.GetPropValue<string?>(requestQueryObjectProperty, "SortBy");

            //Pobieranie isDescSort i jego wartosci
            var isDescValue = Properties.GetPropValue<bool?>(requestQueryObjectProperty, "IsDescSort");

            if (string.IsNullOrEmpty(sortByValue))
            {
                return query;
            }
            //obiekt encji
            var parameter = Expression.Parameter(typeof(T), "x");
            //szuka czy w encji jest pole o nazwie podanej w sortBy
            var property = typeof(T).GetProperty(sortByValue, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);

            if (property == null)
            {
                return query;
            }
            var desc = "OrderByDescending";
            var order = "OrderBy";

            //uzyskuje wlasciwosci podanej w sortBy
            var propertyAcces = Expression.MakeMemberAccess(parameter, property);
            //wyrazenie ktore przyjmuje parameter i zwraca np. parameter.Name
            var orderByExpression = Expression.Lambda(propertyAcces, parameter);

            //tworzy metode sorutjaca
            var methodName = isDescValue.Value ? desc : order;
            var method = typeof(Queryable).GetMethods() //tworzy obiekt reprezentujacy klase Queryable i zwraca jej metody
                .Where(m => m.Name == methodName && m.GetParameters().Length == 2) //wyszukuje w tych metodach OrderByDescending lub OrderBy
                .Single()
                .MakeGenericMethod(typeof(T), property.PropertyType);//tworzy generyczna metode

            var result = (IQueryable<T>)method.Invoke(null, new object[] { query, orderByExpression });
            return result;
        }
    }
}

