using Api.Domain.Models;
using Api.Infrastructure.Context;
using Api.Migrations;
using AutoMapper;
using MediatR;
using System.Security.Claims;

namespace Api.Features.Announcements.Commands.CreateAnnouncement
{
    public class CreateAnnouncementCommand : IRequest<CreateAnnouncementDto>
    {
        public required CreateAnnouncementRequest announcementRequest;
        public string CurrentUserId { get; set; }
    }
    public class CreateAnnouncementCommandHandler : IRequestHandler<CreateAnnouncementCommand, CreateAnnouncementDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CreateAnnouncementCommandHandler(IApplicationDbContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CreateAnnouncementDto> Handle(CreateAnnouncementCommand request, CancellationToken cancellationToken)
        {
            var announcement = _mapper.Map<Announcement>(request.announcementRequest);
            announcement.UserId = Guid.Parse(request.CurrentUserId);
            await _context.Announcements.AddAsync(announcement);
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<CreateAnnouncementDto>(announcement);
        }
    }
}
