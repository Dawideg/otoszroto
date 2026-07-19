using Api.Features.Announcements.Queries.GetAllAnouncements;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Security.Claims;

namespace Api.Features.Announcements.Queries.GetUsersAnnouncements
{
    public class GetUsersAnnouncementsEndpoint : EndpointBaseAsync.WithoutRequest.WithActionResult<List<GetAnnouncementsDto>>
    {
        private readonly IMediator _mediator;

        public GetUsersAnnouncementsEndpoint(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("api/usersAnnouncements")]
        [SwaggerOperation(
            Summary = "Browse logged user Announcements",
            Tags = new[] { "Announcements" })
        ]
        public override async Task<ActionResult<List<GetAnnouncementsDto>>> HandleAsync(CancellationToken cancellationToken = default)
        {
            return Ok(await _mediator.Send(new GetUsersAnnouncementsQuery { UserId = User.FindFirstValue(ClaimTypes.NameIdentifier) }));
        }
    }
}
