using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Features.Announcements.Queries.GetAnnouncement
{
    public class GetAnnouncementEndpoint : EndpointBaseAsync.WithRequest<Guid>.WithActionResult<GetAnnouncementResponse>
    {
        private readonly IMediator _mediator;

        public GetAnnouncementEndpoint(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("api/announcements/{id}")]
        [SwaggerOperation(
           Summary = "Get Announcement",
           Tags = new[] { "Announcements" })
       ]

        public override async Task<ActionResult<GetAnnouncementResponse>> HandleAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return Ok(await _mediator.Send(new GetAnnouncementQuery { id = id }));
        }
    }
}
