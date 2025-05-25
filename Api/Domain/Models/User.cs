using Microsoft.AspNetCore.Identity;

namespace Api.Domain.Models
{
    public class User : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool IsCompany { get; set; }
    }
}
