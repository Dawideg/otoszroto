import React, { useState } from "react";
import "../styles/ChatWidget.css";
import { getData, getDataParams } from "../../api/getData";
const ChatWidget = ({
  brand,
  model,
  desc,
  price,
  yearOfProduction,
  engine,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const aiQuery =
      " - Odpowiedz na pytanie dotyczące ogłoszenia sprzedaży samochodu: " +
      brand +
      " " +
      model +
      ". Opis ogłoszenia: " +
      desc +
      " cena: " +
      price +
      "zł, rok produkcji: " +
      yearOfProduction +
      ", pojemność silinia: " +
      engine +
      "cm3. Odpowiedz w języku polskim, nie używaj żadnego formatowania tekstu ani customowych czcionek, odpowiedz krótko - 3 - 5 zdań.";
    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("https://localhost:7067/api/deepseek/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input + aiQuery }),
      });

      const answerText = await response.text();

      const aiMessage = {
        from: "ai",
        text: answerText,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Błąd podczas pobierania odpowiedzi." },
      ]);
      console.error("Błąd:", error);
    }
  };

  return (
    <div className={`chat-container ${isOpen ? "open" : ""}`}>
      <button className="btn otomotobtn1 toggle-btn" onClick={toggleChat}>
        {isOpen ? "Zamknij" : "Chat z AI"}
      </button>

      <div className="chat-box card shadow">
        <div
          className="card-header text-white"
          style={{ backgroundColor: "#072a3e" }}
        >
          Chat z asystentem AI
        </div>
        <div className="card-body chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.from}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="card-footer d-flex">
          <input
            className="form-control me-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Napisz wiadomość..."
          />
          <button className="btn btn-success" onClick={sendMessage}>
            Wyślij
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
