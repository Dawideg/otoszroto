namespace Api.Domain.Models
{
    public class ChatMessage
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string SenderId { get; set; } = null!;
        public string ReceiverId { get; set; } = null!;
        public string Text { get; set; } = null!;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
