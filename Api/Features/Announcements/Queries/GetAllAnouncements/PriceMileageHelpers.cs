using Api.Domain.Models;
using Api.Features.Announcements.Shared;

namespace Api.Features.Announcements.Queries.GetAllAnouncements
{
    public static class PriceMileageHelpers
    {
        public static IQueryable<Announcement> FilterByPrice(this IQueryable<Announcement> query, GetAllAnnouncementsQuery request)
        {
            if (request.QueryObject.MaxPrice != null)
            {
                return query.Where(s => s.Price >= request.QueryObject.MinPrice && s.Price <= request.QueryObject.MaxPrice).AsQueryable();
            }
            else { return query; }
        }
        public static IQueryable<Announcement> FilterByMileage(this IQueryable<Announcement> query, GetAllAnnouncementsQuery request)
        {
            if (request.QueryObject.MaxMileage != null)
            {
                return query.Where(s => s.Mileage >= request.QueryObject.MinMileage && s.Mileage <= request.QueryObject.MaxMileage).AsQueryable();
            }
            else { return query; }
        }
        public static IQueryable<Announcement> FilterByYear(this IQueryable<Announcement> query, GetAllAnnouncementsQuery request)
        {
            if (request.QueryObject.EndYear != null)
            {
                return query.Where(s => s.YearOfProduction >= request.QueryObject.StartYear && s.Mileage <= request.QueryObject.EndYear).AsQueryable();
            }
            else { return query; }
        }
    }
}
