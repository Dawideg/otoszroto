using Api.Domain.Models;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Features.Identity.Query.GetAllChatHistory
{
    public class GetAllChatHistoryEndpoint : EndpointBaseAsync.WithoutRequest.WithActionResult<List<ChatMessage>>
    {
        private readonly IMediator _mediator;

        public GetAllChatHistoryEndpoint(IMediator mediator)
        {
            _mediator = mediator;

        }
        [HttpGet("api/chat/history/")]
        [SwaggerOperation(
            Summary = "Browse chat history for user",
            Tags = new[] { "Chat" })
        ]
        public async override Task<ActionResult<List<ChatMessage>>> HandleAsync(CancellationToken cancellationToken = default)
        {
            return Ok( await _mediator.Send(new GetAllChatHistoryQuery()));
        }
    }
}
