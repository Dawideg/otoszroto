using Api.Domain.Models;
using Api.Infrastructure.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Api.Features.Identity.Query.GetAllChatHistory
{
    public class GetAllChatHistoryQuery : IRequest<List<ChatMessage>>
    {

    }
    public class GetAllChatHistoryHandler : IRequestHandler<GetAllChatHistoryQuery, List<ChatMessage>>
    {
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IApplicationDbContext _context;

        public GetAllChatHistoryHandler(IHttpContextAccessor contextAccessor, IApplicationDbContext context)
        {
            _contextAccessor = contextAccessor;
            _context = context;
        }

        public async Task<List<ChatMessage>> Handle(GetAllChatHistoryQuery request, CancellationToken cancellationToken)
        {
            var currentUserId = _contextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId == null)
                throw new UnauthorizedAccessException("Brak autoryzacji");

            var messages = await _context.ChatMessages
                .Where(m => m.SenderId == currentUserId || m.ReceiverId == currentUserId)
                .OrderByDescending(m => m.Timestamp)
                .ToListAsync();

            return messages;
        }
    }
}
