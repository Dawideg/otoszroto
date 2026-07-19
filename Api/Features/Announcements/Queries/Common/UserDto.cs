namespace Api.Features.Announcements.Queries.Common
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string PhoneNumber { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public bool IsCompany { get; set; }
    }
}
