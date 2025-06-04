using MediatR;

namespace Api.Features.Deepseek
{
    public class AskDeepseekCommand : IRequest<string>
    {
        public string Prompt { get; set; }
    }
}
