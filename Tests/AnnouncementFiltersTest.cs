using Api.Domain.Models;
using Api.Features.Announcements.Queries.GetAllAnouncements;
using Api.Features.Announcements.Shared;

namespace Tests
{
    public class AnnouncementFiltersTest
    {

        private static IQueryable<Announcement> GetSampleData()
        {
            return new List<Announcement>
            {
                new Announcement { Id = Guid.NewGuid(), Price = 10000, Mileage = 50000,  YearOfProduction = 2015 },
                new Announcement { Id = Guid.NewGuid(), Price = 25000, Mileage = 120000, YearOfProduction = 2018 },
                new Announcement { Id = Guid.NewGuid(), Price = 50000, Mileage = 10000,  YearOfProduction = 2022 },
                new Announcement { Id = Guid.NewGuid(), Price = 75000, Mileage = 5000,   YearOfProduction = 2023 },
            }.AsQueryable();
        }

        private static GetAllAnnouncementsQuery BuildRequest(
            double? minPrice = null, double? maxPrice = null,
            int? minMileage = null, int? maxMileage = null,
            int? startYear = null, int? endYear = null)
        {
            return new GetAllAnnouncementsQuery
            {
                QueryObject = new AnnouncementQueryObject
                {
                    MinPrice = minPrice,
                    MaxPrice = maxPrice,
                    MinMileage = minMileage,
                    MaxMileage = maxMileage,
                    StartYear = startYear,
                    EndYear = endYear
                }
            };
        }

        // ---------------------- FilterByPrice ----------------------

        [Fact]
        public void FilterByPrice_NoFilters_ReturnsAllItems()
        {
            var data = GetSampleData();
            var request = BuildRequest();

            var result = data.FilterByPrice(request).ToList();

            Assert.Equal(4, result.Count);
        }

        [Fact]
        public void FilterByPrice_OnlyMinPrice_ReturnsItemsAboveOrEqualMin()
        {
            var data = GetSampleData();
            var request = BuildRequest(minPrice: 30000);

            var result = data.FilterByPrice(request).ToList();

            Assert.Equal(2, result.Count);
            Assert.All(result, a => Assert.True(a.Price >= 30000));
        }

        [Fact]
        public void FilterByPrice_OnlyMaxPrice_ReturnsItemsBelowOrEqualMax()
        {
            var data = GetSampleData();
            var request = BuildRequest(maxPrice: 30000);

            var result = data.FilterByPrice(request).ToList();

            Assert.Equal(2, result.Count);
            Assert.All(result, a => Assert.True(a.Price <= 30000));
        }

        [Fact]
        public void FilterByPrice_WithMinAndMaxPrice_ReturnsOnlyItemsInRange()
        {
            var data = GetSampleData();
            var request = BuildRequest(minPrice: 20000, maxPrice: 60000);

            var result = data.FilterByPrice(request).ToList();

            Assert.Equal(2, result.Count);
            Assert.All(result, a => Assert.InRange(a.Price, 20000, 60000));
        }

        // ---------------------- FilterByMileage ----------------------

        [Fact]
        public void FilterByMileage_NoFilters_ReturnsAllItems()
        {
            var data = GetSampleData();
            var request = BuildRequest();

            var result = data.FilterByMileage(request).ToList();

            Assert.Equal(4, result.Count);
        }

        [Fact]
        public void FilterByMileage_OnlyMinMileage_ReturnsItemsAboveOrEqualMin()
        {
            var data = GetSampleData();
            var request = BuildRequest(minMileage: 20000);

            var result = data.FilterByMileage(request).ToList();

            Assert.Equal(2, result.Count);
            Assert.All(result, a => Assert.True(a.Mileage >= 20000));
        }

        [Fact]
        public void FilterByMileage_OnlyMaxMileage_ReturnsItemsBelowOrEqualMax()
        {
            var data = GetSampleData();
            var request = BuildRequest(maxMileage: 20000);

            var result = data.FilterByMileage(request).ToList();

            Assert.Equal(2, result.Count);
            Assert.All(result, a => Assert.True(a.Mileage <= 20000));
        }

        [Fact]
        public void FilterByMileage_WithMinAndMaxMileage_ReturnsOnlyItemsInRange()
        {
            var data = GetSampleData();
            var request = BuildRequest(minMileage: 8000, maxMileage: 60000);

            var result = data.FilterByMileage(request).ToList();

            Assert.Equal(2, result.Count);
            Assert.All(result, a => Assert.InRange(a.Mileage, 8000, 60000));
        }

        // ---------------------- FilterByYear ----------------------

        [Fact]
        public void FilterByYear_NoFilters_ReturnsAllItems()
        {
            var data = GetSampleData();
            var request = BuildRequest();

            var result = data.FilterByYear(request).ToList();

            Assert.Equal(4, result.Count);
        }

        [Fact]
        public void FilterByYear_OnlyStartYear_ReturnsItemsFromYearOnwards()
        {
            var data = GetSampleData();
            var request = BuildRequest(startYear: 2018);

            var result = data.FilterByYear(request).ToList();

            Assert.Equal(3, result.Count);
            Assert.All(result, a => Assert.True(a.YearOfProduction >= 2018));
        }

        [Fact]
        public void FilterByYear_OnlyEndYear_ReturnsItemsUpToYear()
        {
            var data = GetSampleData();
            var request = BuildRequest(endYear: 2018);

            var result = data.FilterByYear(request).ToList();

            Assert.Equal(2, result.Count);
            Assert.All(result, a => Assert.True(a.YearOfProduction <= 2018));
        }

        [Fact]
        public void FilterByYear_WithStartAndEndYear_ReturnsOnlyItemsInYearRange()
        {
            var data = GetSampleData();
            var request = BuildRequest(startYear: 2016, endYear: 2022);

            var result = data.FilterByYear(request).ToList();

            Assert.Equal(2, result.Count);
            Assert.All(result, a => Assert.InRange(a.YearOfProduction, 2016, 2022));
        }
    }
}
