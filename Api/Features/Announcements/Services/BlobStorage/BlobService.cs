
using Azure;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace Api.Features.Announcements.Services.BlobStorage
{
    public class BlobService(BlobServiceClient blobServiceClient, IConfiguration config) : IBlobService
    {
        string containerName = config["AzureBlobStorage:ContainerName"];

        public async Task DeleteAsync(Guid fileId, CancellationToken cancellationToken = default)
        {
            BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(containerName);

            BlobClient blobClient = containerClient.GetBlobClient(fileId.ToString());

            await blobClient.DeleteIfExistsAsync(cancellationToken: cancellationToken);


        }

        public async Task<FileResponse> DownloadAsync(Guid fileId, CancellationToken cancellationToken = default)
        {
            BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(containerName);

            BlobClient blobClient = containerClient.GetBlobClient(fileId.ToString());

            Response<BlobDownloadResult> response = await blobClient.DownloadContentAsync(cancellationToken: cancellationToken);

            return new FileResponse(response.Value.Content.ToStream(),response.Value.Details.ContentType);

        }

        public async Task<Guid> UploadAsync(Stream stream, string contentType, CancellationToken cancellationToken = default)
        {
            //definiowanie kontenera (folderu)
            BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(containerName);

            //definiowanie nowego obrazu w bazie
            var fileId = Guid.NewGuid();
            BlobClient blobClient = containerClient.GetBlobClient(fileId.ToString());

            await blobClient.UploadAsync(stream, new BlobHttpHeaders { ContentType = contentType} , cancellationToken: cancellationToken);

            return fileId;

        }
    }
}
