using Api.Domain.Models;
using Api.Features.Announcements.Queries.Common;
using Api.Infrastructure.Context;
using AutoMapper;
using Azure;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Announcements.Queries.GetAnnouncement
{
    public class GetAnnouncementQuery : IRequest<GetAnnouncementResponse>
    {
        public required Guid id { get; set; }
    }

    public class GetAnnouncementQueryHandler : IRequestHandler<GetAnnouncementQuery, GetAnnouncementResponse>
    {
        private readonly IApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public GetAnnouncementQueryHandler(IApplicationDbContext context, IMapper mapper, UserManager<User> userManager)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }

        public async Task<GetAnnouncementResponse> Handle(GetAnnouncementQuery request, CancellationToken cancellationToken)
        {
            var announcement = await _context.Announcements.FindAsync(request.id);
            if (announcement == null) { 
                throw new KeyNotFoundException($"Announcement with ID {request.id} not found.");
            }
            var user = await _userManager.FindByIdAsync(announcement.UserId.ToString());
            var res = _mapper.Map<GetAnnouncementResponse>(announcement);
            if (user != null)
            {
                res.UserData = _mapper.Map<UserDto>(user);
            }
            return res;
        }
    }
}
