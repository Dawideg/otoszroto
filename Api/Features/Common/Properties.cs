namespace Api.Features.Common
{
    public static class Properties
    {
        public static TProperty GetPropValue<TProperty>(object obj, string propertyName)
        {
            if (obj == null) throw new ArgumentNullException(nameof(obj));

            var propInfo = obj.GetType().GetProperty(propertyName);
            if (propInfo == null)
            {
                throw new ArgumentException($"{obj.GetType().Name} does not contain {propertyName} property", nameof(obj));
            }

            return (TProperty)propInfo.GetValue(obj);
        }
    }
}
