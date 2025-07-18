using MediatR;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

namespace Api.Features.Identity.Command.Logout
{
    public class LogoutCommand : IRequest<Unit>
    {

    }
    public class LogoutCommandHandler : IRequestHandler<LogoutCommand, Unit>
    {
        private readonly IHttpContextAccessor _contextAccessor;

        public LogoutCommandHandler(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        public async Task<Unit> Handle(LogoutCommand request, CancellationToken cancellationToken)
        {
            if (_contextAccessor.HttpContext != null)
            {
                await _contextAccessor.HttpContext.SignOutAsync(); // wylogowanie z systemu
            }

            return Unit.Value;
        }
    }
}
