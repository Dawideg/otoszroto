using Api.Domain.Models;
using Api.Features.Announcements.Services.BlobStorage;
using Api.Infrastructure.Context;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Api.Features.Announcements.Commands.CreateAnnouncement
{
    public class CreateAnnouncementCommand : IRequest<CreateAnnouncementDto>
    {
        public required CreateAnnouncementRequest announcementRequest;
    }
    public class CreateAnnouncementCommandHandler : IRequestHandler<CreateAnnouncementCommand, CreateAnnouncementDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IBlobService _blobService;
        private readonly IHttpContextAccessor _contextAccessor;

        public CreateAnnouncementCommandHandler(IApplicationDbContext context,IHttpContextAccessor contextAccessor,IMapper mapper, IBlobService blobService)
        {
            _context = context;
            _mapper = mapper;
            _blobService = blobService;
            _contextAccessor = contextAccessor;
        }

        public async Task<CreateAnnouncementDto> Handle(CreateAnnouncementCommand request, CancellationToken cancellationToken)
        {
            Console.WriteLine(request.announcementRequest);
            var userId = _contextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                throw new UnauthorizedAccessException("Nie zalogowano");
            }
            var announcement = _mapper.Map<Announcement>(request.announcementRequest);
            announcement.UserId = Guid.Parse(userId);

            announcement.UserId = Guid.Parse(userId);
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
