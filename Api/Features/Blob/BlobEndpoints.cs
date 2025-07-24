using Api.Features.Announcements.Services.BlobStorage;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace Api.Features.Blob
{
    public static class BlobEndpoints
    {
        public static void MapBlobEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("api")
                .WithTags("Blob")
                .DisableAntiforgery();

            group.MapPost("/images", async (IFormFile file, IBlobService blobService) =>
            {
                using Stream stream = file.OpenReadStream();
                Guid fileId = await blobService.UploadAsync(stream, file.ContentType);
                return Results.Ok(fileId);
            });

            group.MapGet("/files/{fileId}", async (Guid fileId, IBlobService blobService) =>
            {
                FileResponse fileResponse = await blobService.DownloadAsync(fileId);
                return Results.File(fileResponse.Stream, fileResponse.ContentType);
            });

            group.MapDelete("/files/{fileId}", async (Guid fileId, IBlobService blobService) =>
            {
                await blobService.DeleteAsync(fileId);
                return Results.NoContent();
            });
        }
    }
}
