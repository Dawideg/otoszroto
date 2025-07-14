using Api.Domain.Models;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Identity.Query.GetUserNameById
{
    public class GetUserNameByIdEndpoint : EndpointBaseAsync.WithRequest<Guid>.WithActionResult<GetUserNameByIdDto>
    {
        private readonly UserManager<User> _userManager;

        public GetUserNameByIdEndpoint(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("api/user/{id}")]
        public async override Task<ActionResult<GetUserNameByIdDto>> HandleAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null) { 
                return NotFound();
            }
            return Ok(new GetUserNameByIdDto
            {
                Name = $"{user.Name } {user.Surname}"
            });
        }
    }
}
