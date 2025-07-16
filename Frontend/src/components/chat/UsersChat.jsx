import { useEffect, useState, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { fetchUser, fetchChatHistory } from "../../api/getData";

const UsersChat = ({ receiverId, setShowChat }) => {
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(receiverId ?? null);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [userNames, setUserNames] = useState({});

  const messagesEndRef = useRef(null);

  // Scroll na dół po każdej wiadomości
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Pobierz dane obecnie zalogowanego użytkownika
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const user = await fetchUser();
        setCurrentUserData(user);
        setUserNames((prev) => ({ ...prev, [user.id]: "Ty" }));
      } catch (err) {
        console.error("Błąd pobierania danych użytkownika:", err);
      }
    };
    loadCurrentUser();
  }, []);

  // Pobierz historię wiadomości dla wybranego użytkownika
  useEffect(() => {
    if (!selectedUser || !currentUserData) return;

    const loadHistory = async () => {
      try {
        const history = await fetchChatHistory(selectedUser);
        setMessages(history);

        // Pobierz nazwę rozmówcy, jeśli jeszcze jej nie mamy
        const senderIds = new Set(history.map((m) => m.senderId));
        for (const id of senderIds) {
          if (!userNames[id]) {
            const user = await fetchUser(id);
            setUserNames((prev) => ({ ...prev, [id]: user.name }));
          }
        }
      } catch (err) {
        console.error("Błąd ładowania historii czatu:", err);
      }
    };

    loadHistory();
  }, [selectedUser, currentUserData]);

  // Połączenie z SignalR
  useEffect(() => {
    if (!currentUserData) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7067/chatHub", {
        withCredentials: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log("Połączono z SignalR");

        connection.on("ReceiveMessage", async (fromUser, msg) => {
          if (!userNames[fromUser]) {
            try {
              const user = await fetchUser(fromUser);
              setUserNames((prev) => ({ ...prev, [fromUser]: user.name }));
            } catch (err) {
              console.error("Błąd pobierania nadawcy:", err);
            }
          }

          setMessages((prev) => [...prev, { senderId: fromUser, text: msg }]);
          if (!selectedUser) setSelectedUser(fromUser);
        });
      })
      .catch((err) => console.error("Błąd połączenia:", err));

    setConnection(connection);
    setSelectedUser(receiverId ?? null);

    return () => {
      connection
        .stop()
        .catch((err) => console.error("Błąd przy rozłączaniu:", err));
    };
  }, [currentUserData]);

  const sendMessage = async () => {
    if (!connection || !selectedUser || !message.trim()) return;

    try {
      await connection.invoke("SendPrivateMessage", selectedUser, message);
      setMessages((prev) => [
        ...prev,
        { senderId: currentUserData.id, text: message },
      ]);
      setMessage("");
    } catch (err) {
      console.error("Błąd wysyłania wiadomości:", err);
    }
  };

  return (
    <div
      className="position-fixed bottom-0 end-0 m-4 border bg-white shadow rounded"
      style={{ width: "400px", height: "500px", zIndex: 1050 }}
    >
      <div className="d-flex justify-content-between align-items-center p-2 border-bottom bg-light rounded-top">
        <strong>
          {selectedUser && userNames[selectedUser]
            ? `Czat z ${userNames[selectedUser]}`
            : "Czat"}
        </strong>
        <button
          type="button"
          className="btn-close"
          aria-label="Zamknij"
          onClick={() => setShowChat(false)}
        ></button>
      </div>

      <div className="d-flex h-100">
        <div className="d-flex flex-column flex-grow-1">
          <div
            className="flex-grow-1 p-2 overflow-auto"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            {currentUserData ? (
              messages.length > 0 ? (
                messages.map((m, idx) => {
                  const isMe = m.senderId === currentUserData.id;
                  const displayName = userNames[m.senderId] || m.senderId;

                  return (
                    <div
                      key={idx}
                      className={`d-flex mb-2 ${
                        isMe ? "justify-content-end" : "justify-content-start"
                      }`}
                    >
                      <div
                        className={`p-2 rounded shadow-sm ${
                          isMe ? "bg-primary text-white" : "bg-light"
                        }`}
                        style={{ maxWidth: "75%" }}
                      >
                        <div style={{ fontSize: "0.9rem" }}>{m.text}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-muted">Brak wiadomości</div>
              )
            ) : (
              <div className="text-muted">Ładowanie użytkownika...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-top p-2 d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Wpisz wiadomość..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <button onClick={sendMessage} className="btn btn-primary">
              Wyślij
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersChat;
