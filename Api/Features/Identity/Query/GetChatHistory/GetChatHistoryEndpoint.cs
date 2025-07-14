using Api.Domain.Models;
using Api.Features.Announcements.Queries.GetAllAnouncements;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Features.Identity.Query.GetChatHistory
{
    public class GetChatHistoryEndpoint : EndpointBaseAsync.WithRequest<Guid>.WithActionResult<List<ChatMessage>>
    {
        private readonly IMediator _mediator;

        public GetChatHistoryEndpoint(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("api/chat/history/{id}")]
        [SwaggerOperation(
            Summary = "Browse chat history for user",
            Tags = new[] { "Chat" })
        ]
        public async override Task<ActionResult<List<ChatMessage>>> HandleAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return Ok(await _mediator.Send(new GetChatHistoryQuery { receiverId = id }));
        }
    }
}
