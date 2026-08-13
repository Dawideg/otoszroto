using Api.Domain.Models;
using Api.Features.Announcements.Shared;

namespace Api.Features.Announcements.Queries.GetAllAnouncements
{
    public static class PriceMileageHelpers
    {
        public static IQueryable<Announcement> FilterByPrice(this IQueryable<Announcement> query, GetAllAnnouncementsQuery request)
        {
            if (request.QueryObject.MinPrice != null)
            {
                query = query.Where(s => s.Price >= request.QueryObject.MinPrice);
            }
            if (request.QueryObject.MaxPrice != null)
            {
                query = query.Where(s => s.Price <= request.QueryObject.MaxPrice);
            }
            return query;
        }

        public static IQueryable<Announcement> FilterByMileage(this IQueryable<Announcement> query, GetAllAnnouncementsQuery request)
        {
            if (request.QueryObject.MinMileage != null)
            {
                query = query.Where(s => s.Mileage >= request.QueryObject.MinMileage);
            }
            if (request.QueryObject.MaxMileage != null)
            {
                query = query.Where(s => s.Mileage <= request.QueryObject.MaxMileage);
            }
            return query;
        }

        public static IQueryable<Announcement> FilterByYear(this IQueryable<Announcement> query, GetAllAnnouncementsQuery request)
        {
            if (request.QueryObject.StartYear != null)
            {
                query = query.Where(s => s.YearOfProduction >= request.QueryObject.StartYear);
            }
            if (request.QueryObject.EndYear != null)
            {
                query = query.Where(s => s.YearOfProduction <= request.QueryObject.EndYear);
            }
            return query;
        }
    }
}