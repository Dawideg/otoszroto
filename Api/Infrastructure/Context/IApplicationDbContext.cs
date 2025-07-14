using Api.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Infrastructure.Context
{
    public interface IApplicationDbContext
    {
        DbSet<Announcement> Announcements { get; set; }
        DbSet<ChatMessage> ChatMessages { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
