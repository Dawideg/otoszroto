using Api.Features.Common;

namespace Api.Features.Announcements.Shared
{
    public class AnnouncementQueryObject : SortAndPaginationQueryOptions
    {
        public string? Brand { get; set; }
        public string? Model { get; set; }
        public string? Generation { get; set; }
        public int? StartYear { get; set; } = 0;
        public int? EndYear { get; set; } = int.MaxValue;
        public string? Gearbox{ get; set; }
        public double? MinPrice { get; set; } = 0;
        public double? MaxPrice { get; set; } = double.MaxValue;
        public string? City { get; set; }
        public string? BodyType { get; set; }
        public int? MinMileage { get; set; } = 0;
        public int? MaxMileage { get; set; } = int.MaxValue;
        public double? MinEngineCapacity { get; set; }
        public double? MaxEngineCapacity { get; set; }
        public int? MinHorsepower { get; set; }
        public int? MaxHorsepower { get; set; }
        public string? Powertrain { get; set; }
        public string? FuelType { get; set; }
        public string? Condition { get; set; }
        public bool? AccidentFree { get; set; }
    }
}
