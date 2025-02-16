using Api.Domain.Models;
using Api.Features.Announcements.Commands.CreateAnnouncement;
using Api.Features.Announcements.Commands.DeleteAnnouncement;
using Api.Features.Announcements.Commands.UpdateAnnouncement;
using Api.Features.Announcements.Queries.GetAllAnouncements;
using Api.Features.Announcements.Queries.GetAnnouncement;
using AutoMapper;

namespace Api.Features.Announcements.Shared
{
    public class AnnouncementMapper : Profile
    {
        public AnnouncementMapper()
        {
            CreateMap<Announcement, GetAllAnouncementsDto>();
            CreateMap<CreateAnnouncementRequest, Announcement>();
            CreateMap<Announcement, CreateAnnouncementDto>();
            CreateMap<Announcement, GetAnnouncementResponse>();
            CreateMap<Announcement, DeleteAnnouncementResponse>();
            CreateMap<UpdateAnnouncementModelRequest, Announcement>();
            CreateMap<Announcement, UpdateAnnouncementResponse>();
        }
    }
}
