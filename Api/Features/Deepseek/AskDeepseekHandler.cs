using MediatR;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;

namespace Api.Features.Deepseek
{
    public class AskDeepseekHandler : IRequestHandler<AskDeepseekCommand, string>
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public AskDeepseekHandler(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<string> Handle(AskDeepseekCommand request, CancellationToken cancellationToken)
        {
            var apiKey = _configuration["DeepSeek:ApiKey"];
            var requestBody = new
            {
                model = "deepseek-chat",
                messages = new[]
                {
                    new { role = "user", content = request.Prompt }
                }
            };

            var httpRequest = new HttpRequestMessage(HttpMethod.Post, "https://api.deepseek.com/v1/chat/completions")
            {
                Content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json")
            };

            httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            var response = await _httpClient.SendAsync(httpRequest, cancellationToken);
            var content = await response.Content.ReadAsStringAsync(cancellationToken);

            if (!response.IsSuccessStatusCode)
                throw new Exception($"DeepSeek API error: {content}");

            dynamic parsed = JsonConvert.DeserializeObject(content);
            return parsed?.choices[0]?.message?.content ?? "Brak odpowiedzi";
        }
    }
}
