namespace Api.Features.Common
{
    public class SortAndPaginationQueryOptions
    {
        public string? SortBy { get; set; } = null;
        public bool IsDescSort { get; set; } = false;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
}
