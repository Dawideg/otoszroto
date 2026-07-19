using Api.Domain.Models;
using Api.Infrastructure.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Api.Features.Identity.Query.GetChatHistory
{
    public class GetChatHistoryQuery : IRequest<List<ChatMessage>>
    {
        public required Guid receiverId { get; set; }
    }

    public class GetChatHistoryHandler : IRequestHandler<GetChatHistoryQuery, List<ChatMessage>>
    {
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IApplicationDbContext _context;

        public GetChatHistoryHandler(IHttpContextAccessor contextAccessor, IApplicationDbContext context)
        {
            _contextAccessor = contextAccessor;
            _context = context;
        }
        public async Task<List<ChatMessage>> Handle(GetChatHistoryQuery request, CancellationToken cancellationToken)
        {
            var currentUserId = _contextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId == null)
                throw new UnauthorizedAccessException("Brak autoryzacji");

            var messages = await _context.ChatMessages
                .Where(m =>
                    (m.SenderId == currentUserId && m.ReceiverId == request.receiverId.ToString()) ||
                    (m.SenderId == request.receiverId.ToString() && m.ReceiverId == currentUserId))
                .OrderBy(m => m.Timestamp)
                .ToListAsync();

            return messages;
        }
    }
}
