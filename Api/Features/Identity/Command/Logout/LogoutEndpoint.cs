using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Features.Identity.Command.Logout
{
    public class LogoutEndpoint :EndpointBaseAsync.WithoutRequest.WithActionResult<object>
    {
        private readonly IMediator _mediator;

        public LogoutEndpoint(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("/logout")]
        [SwaggerOperation(
            Summary = "Logout user",
            Tags = new[] { "Api" })
        ]
        public async override Task<ActionResult<object>> HandleAsync(CancellationToken cancellationToken = default)
        {
            await _mediator.Send(new LogoutCommand { });
            return Ok(new { message = "Logged out" });
        }
    }
}
