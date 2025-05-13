using Api.Domain.Models;
using Api.Features.Announcements.Shared;
using Api.Features.Common.FilterAndSortFunctions;
using Api.Infrastructure.Context;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Announcements.Queries.GetAllAnouncements
{
    public class GetAllAnnouncementsQuery : IRequest<List<GetAnnouncementsDto>>
    {
        public AnnouncementQueryObject QueryObject { get; set; } 
    }

    public class GetAllAnnouncementsQueryHandler : IRequestHandler<GetAllAnnouncementsQuery, List<GetAnnouncementsDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetAllAnnouncementsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<GetAnnouncementsDto>> Handle(GetAllAnnouncementsQuery request, CancellationToken cancellationToken)
        {
            if (request.QueryObject == null)
            {
                throw new InvalidOperationException("QueryObject cannot be null.");
            }
            var query = _context.Announcements.AsQueryable();

            query = query.ApplyFilters(request);

            query = query.ApplySorting(request);

            return await query
                .ProjectTo<GetAnnouncementsDto>(_mapper.ConfigurationProvider)
                .Skip((request.QueryObject.PageNumber-1)*request.QueryObject.PageSize)
                .Take(request.QueryObject.PageSize)
                .ToListAsync();
        }
    }
}
