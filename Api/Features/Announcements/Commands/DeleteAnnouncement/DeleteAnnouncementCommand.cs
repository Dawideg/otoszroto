using Api.Infrastructure.Context;
using AutoMapper;
using MediatR;

namespace Api.Features.Announcements.Commands.DeleteAnnouncement
{
    public class DeleteAnnouncementCommand : IRequest<DeleteAnnouncementResponse>
    {
        public required Guid id { get; set; }
    }

    public class DeleteAnnouncementCommandHandler : IRequestHandler<DeleteAnnouncementCommand, DeleteAnnouncementResponse>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public DeleteAnnouncementCommandHandler(IApplicationDbContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<DeleteAnnouncementResponse> Handle(DeleteAnnouncementCommand request, CancellationToken cancellationToken)
        {
            var res = await _context.Announcements.FindAsync(request.id);
            if (res == null)
            {
                throw new KeyNotFoundException($"Announcement with ID {request.id} not found.");
            }
            _context.Announcements.Remove(res);
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<DeleteAnnouncementResponse>(res);
        }
    }
}
