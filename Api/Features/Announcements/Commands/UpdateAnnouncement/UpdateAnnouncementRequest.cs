using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Announcements.Commands.UpdateAnnouncement
{
    public class UpdateAnnouncementRequest
    {
        [FromRoute(Name = "id")] public Guid Id { get; set; }
        [FromBody] public required UpdateAnnouncementModelRequest UpdateAnnouncementModelRequest { get; set; }
    }
}