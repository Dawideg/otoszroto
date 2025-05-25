using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using System.Net;
using System.Security.Claims;

namespace Api.Features.Announcements.Commands.CreateAnnouncement
{
    [ApiController]
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
        public async override Task<ActionResult<CreateAnnouncementDto>> HandleAsync([FromForm] CreateAnnouncementRequest request, CancellationToken cancellationToken = default)
        {

            return Ok( await _mediator.Send(new CreateAnnouncementCommand { announcementRequest = request, CurrentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier) }));
        }
    }
}
