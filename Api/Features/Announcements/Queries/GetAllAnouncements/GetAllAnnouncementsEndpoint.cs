using Api.Features.Announcements.Shared;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Features.Announcements.Queries.GetAllAnouncements
{
    public class GetAllAnnouncementsEndpoint : EndpointBaseAsync.WithRequest<AnnouncementQueryObject>.WithActionResult<List<GetAnnouncementsDto>>
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
        public override async Task<ActionResult<List<GetAnnouncementsDto>>> HandleAsync([FromQuery] AnnouncementQueryObject queryObject, CancellationToken cancellationToken = default)
        {
            return Ok(await _mediator.Send(new GetAllAnnouncementsQuery {QueryObject = queryObject }));
        }
    }
}
