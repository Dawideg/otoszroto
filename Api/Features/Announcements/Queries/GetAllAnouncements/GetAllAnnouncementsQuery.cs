using Api.Infrastructure.Context;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Announcements.Queries.GetAllAnouncements
{
    public class GetAllAnnouncementsQuery : IRequest<List<GetAllAnouncementsDto>>
    {
    }

    public class GetAllAnnouncementsQueryHandler : IRequestHandler<GetAllAnnouncementsQuery, List<GetAllAnouncementsDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetAllAnnouncementsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<GetAllAnouncementsDto>> Handle(GetAllAnnouncementsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Announcements
                .ProjectTo<GetAllAnouncementsDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}
