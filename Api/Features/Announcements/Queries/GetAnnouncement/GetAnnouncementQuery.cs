using Api.Infrastructure.Context;
using AutoMapper;
using MediatR;

namespace Api.Features.Announcements.Queries.GetAnnouncement
{
    public class GetAnnouncementQuery : IRequest<GetAnnouncementResponse>
    {
        public required Guid id { get; set; }
    }

    public class GetAnnouncementQueryHandler : IRequestHandler<GetAnnouncementQuery, GetAnnouncementResponse>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetAnnouncementQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<GetAnnouncementResponse> Handle(GetAnnouncementQuery request, CancellationToken cancellationToken)
        {
            var announcement = await _context.Announcements.FindAsync(request.id);
            if (announcement == null) { 
                throw new KeyNotFoundException($"Announcement with ID {request.id} not found.");
            }
            return _mapper.Map<GetAnnouncementResponse>(announcement);
        }
    }
}
