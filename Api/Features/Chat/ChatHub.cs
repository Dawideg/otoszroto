namespace Api.Features.Chat;

using Api.Domain.Models;
using Api.Infrastructure.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Security.Claims;

[Authorize]
public class ChatHub : Hub
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<User> _userManager;

    public ChatHub(ApplicationDbContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public override Task OnConnectedAsync()
    {
        var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        Console.WriteLine($"Użytkownik połączony: {userId}");
        return base.OnConnectedAsync();
    }

    public async Task SendPrivateMessage(string receiverId, string message)
    {
        var senderId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(senderId)) return;

        var chatMessage = new ChatMessage
        {
            SenderId = senderId,
            ReceiverId = receiverId,
            Text = message
        };

        _context.ChatMessages.Add(chatMessage);
        await _context.SaveChangesAsync();

        await Clients.User(receiverId).SendAsync("ReceiveMessage", senderId, message);
        await Clients.User(senderId).SendAsync("ReceiveMessage", senderId, message);
    }
}
