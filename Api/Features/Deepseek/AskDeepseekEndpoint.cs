using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Features.Deepseek
{
    public class AskDeepseekEndpoint : EndpointBaseAsync
            .WithRequest<AskDeepseekCommand>
            .WithActionResult<string>
    {
        private readonly IMediator _mediator;

        public AskDeepseekEndpoint(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("api/deepseek/ask")]
        [SwaggerOperation(
            Summary = "Chat endpoint",
            Tags = new[] { "AI chat" })
        ]
        public override async Task<ActionResult<string>> HandleAsync(
            [FromBody] AskDeepseekCommand request,
            CancellationToken cancellationToken = default)
        {
            var result = await _mediator.Send(request, cancellationToken);
            return Ok(result);
        }
    }
}
