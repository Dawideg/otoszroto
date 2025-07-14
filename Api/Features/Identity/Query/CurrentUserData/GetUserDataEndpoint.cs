using Api.Domain.Models;
using Api.Features.Announcements.Queries.Common;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Api.Features.Identity.Query.CurrentUserData
{
    public class GetUserDataEndpoint : EndpointBaseAsync.WithoutRequest.WithActionResult<GetUserDataDto>
    {
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly UserManager<User> _userManager;

        public GetUserDataEndpoint(IHttpContextAccessor contextAccessor, UserManager<User> userManager)
        {
            _contextAccessor = contextAccessor;
            _userManager = userManager;
        }

        [HttpGet("api/user")]
        public override async Task<ActionResult<GetUserDataDto>> HandleAsync(CancellationToken cancellationToken = default)
        {

            var userId = _contextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId is null)
                return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);

            if (user is null)
                return NotFound();

            return Ok(new GetUserDataDto
            {
                Id = Guid.Parse(user.Id),
                Name = $"{user.Name} {user.Surname}"
            });
        }
    }
}
