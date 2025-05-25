using Api.Domain.Models;
using Api.Features.Announcements.Services.BlobStorage;
using Api.Infrastructure.Context;
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
        private readonly IBlobService _blobService;

        public CreateAnnouncementCommandHandler(IApplicationDbContext context,IMapper mapper, IBlobService blobService)
        {
            _context = context;
            _mapper = mapper;
            _blobService = blobService;
        }

        public async Task<CreateAnnouncementDto> Handle(CreateAnnouncementCommand request, CancellationToken cancellationToken)
        {
            var announcement = _mapper.Map<Announcement>(request.announcementRequest);
            announcement.UserId = Guid.Parse(request.CurrentUserId);
            foreach (var image in request.announcementRequest.Images)
            {
                using var stream = image.OpenReadStream();
                var imageUrl = await _blobService.UploadAsync(stream, image.ContentType);
                announcement.ImageUrls.Add(imageUrl.ToString());
            }
            await _context.Announcements.AddAsync(announcement);
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<CreateAnnouncementDto>(announcement);
        }
    }
}
