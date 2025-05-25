using Api.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Api.Features.Identity.Command.Register
{
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, IResult>
    {
        private readonly UserManager<User> _userManager;

        public RegisterCommandHandler(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IResult> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var emailValidator = new EmailAddressAttribute();
            if (!emailValidator.IsValid(request.Email))
            {
                return Results.BadRequest(new List<string> { "Nieprawidłowy format adresu email." });
            }
            var user = new User
            {
                UserName = request.Email,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Name = request.Name,
                Surname = request.Surname,
                IsCompany = request.IsCompany
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description).ToList();
                return Results.BadRequest(errors);
            }
            return Results.Ok("Konto zostało utworzone");
        }
    }
}
