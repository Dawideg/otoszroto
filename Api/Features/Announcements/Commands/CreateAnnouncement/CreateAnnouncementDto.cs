namespace Api.Features.Announcements.Commands.CreateAnnouncement
{
    public class CreateAnnouncementDto
    {
        public Guid UserId { get; set; }
        public List<string> ImageUrls { get; set; } = new();
        public double Price { get; set; }
        public string Description { get; set; }
        public string Version { get; set; }
        public string City { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Generation { get; set; }
        public string BodyType { get; set; }
        public int Mileage { get; set; }
        public double EngineCapacity { get; set; }
        public int Horsepower { get; set; }
        public string Gearbox { get; set; }
        public string Powertrain { get; set; }
        public string FuelType { get; set; }
        public int YearOfProduction { get; set; }
        public string VinNumber { get; set; }
        public string Condition { get; set; }
        public bool AccidentFree { get; set; }
    }
}