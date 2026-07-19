using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Features.Identity.Command.Register
{
    public class RegisterEndpoint : EndpointBaseAsync
        .WithRequest<RegisterCommand>
        .WithActionResult
    {
        private readonly IMediator _mediator;

        public RegisterEndpoint(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("api/register")]
        [SwaggerOperation(
            Summary = "Register user",
            Tags = new[] { "Api" })
        ]
        public override async Task<ActionResult> HandleAsync([FromBody] RegisterCommand request, CancellationToken cancellationToken = default)
        {
            var result = await _mediator.Send(request, cancellationToken);
            return Ok(result);
        }
    }
}
