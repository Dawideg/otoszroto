using Api.Domain.Models;
using Api.Features.Announcements.Services.BlobStorage;
using Api.Features.Blob;
using Api.Features.Chat;
using Api.Features.Chat.Helpers;
using Api.Infrastructure.Context;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using System.Security.Claims;
using System.Threading.Tasks;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();
builder.Services.AddAuthentication()
    .AddCookie(IdentityConstants.ApplicationScheme);

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;  
    options.Cookie.SameSite = SameSiteMode.None;             

    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    };
    options.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = StatusCodes.Status403Forbidden;
        return Task.CompletedTask;
    };
});

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING")
    ?? builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException("Database connection string is not configured. Set CONNECTION_STRING environment variable or DefaultConnection in configuration.");
}

builder.Services.AddIdentityCore<User>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddApiEndpoints();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly());
});

builder.Services.AddSwaggerGen(option =>
{
    option.EnableAnnotations();
});
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddControllers();
builder.Services.AddOpenApi();



builder.Services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

builder.Services.AddSingleton<IBlobService, BlobService>();
builder.Services.AddSingleton(serviceProvider =>
{
    var config = serviceProvider.GetRequiredService<IConfiguration>();
    var blobConn = config.GetConnectionString("BlobStorage");
    if (string.IsNullOrWhiteSpace(blobConn))
    {
        throw new InvalidOperationException("BlobStorage connection string not configured. Add it to ConnectionStrings:BlobStorage or set the appropriate environment variable.");
    }

    return new BlobServiceClient(blobConn);
});


builder.Services.AddHttpClient();
builder.Services.AddSignalR();
builder.Services.AddSingleton<IUserIdProvider, NameIdentifierUserIdProvider>();
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        var errors = context.ModelState
            .Where(x => x.Value.Errors.Any())
            .Select(x => new
            {
                Field = x.Key,
                Errors = x.Value.Errors.Select(e => e.ErrorMessage).ToArray()
            });

        return new BadRequestObjectResult(errors);
    };
});


var corsPolicyName = "MyCorsPolicy";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicyName,
        policy =>
        {
            policy.WithOrigins("https://localhost:5173", "http://localhost:5000")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});



var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var db = services.GetRequiredService<ApplicationDbContext>();
        db.Database.Migrate();
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while migrating or initializing the database.");
        throw;
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();

    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapSwagger();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseRouting();

app.UseCors(corsPolicyName);
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapHub<ChatHub>("/chatHub");

app.MapControllers();
app.MapIdentityApi<User>();

app.MapBlobEndpoints();

app.Run();
