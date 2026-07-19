using Api.Features.Announcements.Queries.GetAllAnouncements;
using Api.Features.Announcements.Queries.GetAnnouncement;
using Api.Infrastructure.Context;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Announcements.Queries.GetUsersAnnouncements
{
    public class GetUsersAnnouncementsQuery : IRequest<List<GetAnnouncementsDto>>
    {
        public string UserId { get; set; }
    }

    public class GetUsersAnnouncementsQueryHandler : IRequestHandler<GetUsersAnnouncementsQuery, List<GetAnnouncementsDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetUsersAnnouncementsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<GetAnnouncementsDto>> Handle(GetUsersAnnouncementsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Announcements
                .Where(s=>s.UserId == Guid.Parse(request.UserId))
                .ProjectTo<GetAnnouncementsDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}
