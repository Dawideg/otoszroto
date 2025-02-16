using Api.Infrastructure.Context;
using AutoMapper;
using MediatR;

namespace Api.Features.Announcements.Commands.UpdateAnnouncement
{
    public class UpdateAnnouncementCommand : IRequest<UpdateAnnouncementResponse>
    {
        public required Guid Id { get; set; }
        public required UpdateAnnouncementModelRequest announcementRequest;
    }

    public class UpdateAnnouncementCommandHandler : IRequestHandler<UpdateAnnouncementCommand, UpdateAnnouncementResponse>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UpdateAnnouncementCommandHandler(IApplicationDbContext context,IMapper mappper)
        {
            _context = context;
            _mapper = mappper;
        }

        public async Task<UpdateAnnouncementResponse> Handle(UpdateAnnouncementCommand request, CancellationToken cancellationToken)
        {
            var res = await _context.Announcements.FindAsync(request.Id);
            if (res == null) {
                throw new KeyNotFoundException($"Announcement with ID {request.Id} not found.");
            }
            _mapper.Map(request.announcementRequest, res);
            await _context.SaveChangesAsync(cancellationToken);

            return _mapper.Map<UpdateAnnouncementResponse>(res);



        }
    }
}
