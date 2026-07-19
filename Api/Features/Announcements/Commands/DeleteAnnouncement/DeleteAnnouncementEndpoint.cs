using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Features.Announcements.Commands.DeleteAnnouncement
{
    public class DeleteAnnouncementEndpoint : EndpointBaseAsync.WithRequest<Guid>.WithActionResult<DeleteAnnouncementResponse   >
    {
        private readonly IMediator _mediator;

        public DeleteAnnouncementEndpoint(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpDelete("api/announcements/{id}")]
        [SwaggerOperation(
            Summary = "Delete Announcement",
            Tags = new[] { "Announcements" })
        ]
        public override async Task<ActionResult<DeleteAnnouncementResponse>> HandleAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return Ok(await _mediator.Send(new DeleteAnnouncementCommand { id = id }));
        }
    }
}
