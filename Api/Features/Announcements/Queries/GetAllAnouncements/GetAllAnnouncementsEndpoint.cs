using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Features.Announcements.Queries.GetAllAnouncements
{
    public class GetAllAnnouncementsEndpoint : EndpointBaseAsync.WithoutRequest.WithActionResult<List<GetAllAnouncementsDto>>
    {
        private readonly IMediator _mediator;

        public GetAllAnnouncementsEndpoint(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("api/announcements")]
        [SwaggerOperation(
            Summary = "Browse Announcements",
            Tags = new[] { "Announcements" })
        ]
        public override async Task<ActionResult<List<GetAllAnouncementsDto>>> HandleAsync(CancellationToken cancellationToken = default)
        {
            return Ok(await _mediator.Send(new GetAllAnnouncementsQuery { }));
        }
    }
}
