using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Features.Announcements.Commands.CreateAnnouncement
{
    public class CreateAnnouncementEndpoint : EndpointBaseAsync.WithRequest<CreateAnnouncementRequest>.WithActionResult<CreateAnnouncementDto>
    {
        private readonly IMediator _mediator;

        public CreateAnnouncementEndpoint(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("api/announcements")]
        [SwaggerOperation(
            Summary = "Create Announcement",
            Tags = new[] { "Announcements" })
        ]
        public async override Task<ActionResult<CreateAnnouncementDto>> HandleAsync(CreateAnnouncementRequest request, CancellationToken cancellationToken = default)
        {
            return Ok( await _mediator.Send(new CreateAnnouncementCommand { announcementRequest = request }));
        }
    }
}
