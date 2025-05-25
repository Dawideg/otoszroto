using MediatR;

namespace Api.Features.Identity.Command.Register
{
    public class RegisterCommand : IRequest<IResult>
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool IsCompany { get; set; }
    }
}
