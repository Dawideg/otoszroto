using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Features.Announcements.Commands.UpdateAnnouncement
{
    public class UpdateAnnouncementEndpoint : EndpointBaseAsync.WithRequest<UpdateAnnouncementRequest>.WithActionResult<UpdateAnnouncementResponse>
    {
        private readonly IMediator _mediator;
        public UpdateAnnouncementEndpoint(IMediator mediator)
        {
            _mediator = mediator;   
        }

        [HttpPut("api/announcements/{id}")]
        [SwaggerOperation(
           Summary = "Update Announcement",
           Tags = new[] { "Announcements" })
       ]

        public override async Task<ActionResult<UpdateAnnouncementResponse>> HandleAsync(UpdateAnnouncementRequest request, CancellationToken cancellationToken = default)
        {
            return Ok(await _mediator.Send(new UpdateAnnouncementCommand { Id = request.Id, announcementRequest = request.UpdateAnnouncementModelRequest }));
        }
    }
}
