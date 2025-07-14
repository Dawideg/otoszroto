using Api.Domain.Models;
using Api.Features.Announcements.Services.BlobStorage;
using Api.Features.Chat;
using Api.Features.Chat.Helpers;
using Api.Infrastructure.Context;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();
builder.Services.AddAuthentication()
    .AddCookie(IdentityConstants.ApplicationScheme);
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;  // HTTPS wymagana
    options.Cookie.SameSite = SameSiteMode.None;              // pozwala na cross-site wysyłanie
});

builder.Services.AddIdentityCore<User>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddApiEndpoints();

builder.Services.AddMediatR(cfg => {
    cfg.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly());
});

// Add services to the container.
builder.Services.AddSwaggerGen(option => {
    option.EnableAnnotations();
});

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

builder.Services.AddSingleton<IBlobService, BlobService>();
builder.Services.AddSingleton(serviceProvider => {
    var config = serviceProvider.GetRequiredService<IConfiguration>();
    return new BlobServiceClient(config.GetConnectionString("BlobStorage"));
});


//dla niezalogowanych uzytkownikow
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = 401;
        return Task.CompletedTask;
    };
    options.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = 403;
        return Task.CompletedTask;
    };
});
builder.Services.AddHttpClient();
builder.Services.AddSignalR();
builder.Services.AddSingleton<IUserIdProvider, NameIdentifierUserIdProvider>();

var app = builder.Build();  



app.UseCors(policy =>   
    policy.WithOrigins("https://localhost:5173")
          .AllowAnyMethod()
          .AllowAnyHeader()
          .AllowCredentials()
);


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapSwagger();
}
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.MapHub<ChatHub>("/chatHub");

app.MapControllers();
app.MapIdentityApi<User>();

app.MapGet("/users/me", async (ClaimsPrincipal claims, ApplicationDbContext context) => {
    string userId = claims.Claims.First(c=>c.Type == ClaimTypes.NameIdentifier).Value;
    return await context.Users.FindAsync(userId);
})
.RequireAuthorization();

app.MapPost("images", async(IFormFile file, IBlobService blobService) => { 
    using Stream stream = file.OpenReadStream();
    Guid fileId = await blobService.UploadAsync(stream, file.ContentType);
    return Results.Ok(fileId);
})
    .WithTags("Files")
    .DisableAntiforgery();

app.MapGet("files/{fileId}", async (Guid fileId, IBlobService blobService) => {
    FileResponse fileResponse = await blobService.DownloadAsync(fileId);
    return Results.File(fileResponse.Stream, fileResponse.ContentType);
})
    .WithTags("Files")
    .DisableAntiforgery();

app.MapDelete("files/{fileId}", async (Guid fileId, IBlobService blobService) => {
    await blobService.DeleteAsync(fileId);
    return Results.NoContent();
})
    .WithTags("Files")
    .DisableAntiforgery();

app.Run();
