namespace Api.Features.Announcements.Queries.GetAllAnouncements
{
    public class GetAnnouncementsDto
    {
        public double Price { get; set; }
        public string City { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int Mileage { get; set; }
        public double EngineCapacity { get; set; }
        public int Horsepower { get; set; }
        public string FuelType { get; set; }
        public int YearOfProduction { get; set; }
    }
}