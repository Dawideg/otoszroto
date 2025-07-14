import { useEffect, useState, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { fetchUser, fetchChatHistory } from "../../api/getData";

const UsersChat = ({ receiverId }) => {
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(receiverId);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [userNames, setUserNames] = useState({});

  const userListRef = useRef([]);
  useEffect(() => {
    userListRef.current = userList;
  }, [userList]);

  // 👤 Pobierz dane aktualnego użytkownika
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchUser();
        setCurrentUserData(user);
        setUserNames((prev) => ({ ...prev, [user.id]: "Ty" }));
      } catch (err) {
        console.error("Błąd pobierania danych użytkownika:", err);
      }
    };
    loadUser();
  }, []);

  // 💬 Pobierz historię wiadomości
  useEffect(() => {
    if (!selectedUser) return;

    const loadHistory = async () => {
      try {
        const history = await fetchChatHistory(selectedUser); // [{ senderId, text }]
        setMessages(history);

        const uniqueSenderIds = [
          ...new Set(history.map((m) => m.senderId || m.from)),
        ];

        for (const id of uniqueSenderIds) {
          if (!userNames[id]) {
            try {
              const user = await fetchUser(id);
              setUserNames((prev) => ({
                ...prev,
                [id]: user.name,
              }));
            } catch (err) {
              console.error("Błąd pobierania imienia użytkownika:", err);
            }
          }
        }
      } catch (err) {
        console.error("Nie udało się pobrać historii wiadomości:", err);
      }
    };

    loadHistory();
  }, [selectedUser]);

  // 🔌 SignalR połączenie
  useEffect(() => {
    if (!currentUserData) return;

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7067/chatHub", {
        withCredentials: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => {
        console.log("Połączono z hubem");

        newConnection.on("ReceiveMessage", async (fromUser, msg) => {
          // Pobierz imię nadawcy, jeśli nie istnieje
          if (!userNames[fromUser]) {
            try {
              const user = await fetchUser(fromUser);
              setUserNames((prev) => ({
                ...prev,
                [fromUser]: user.name,
              }));
            } catch (err) {
              console.error("Błąd pobierania użytkownika:", err);
            }
          }

          // Dodaj wiadomość
          setMessages((prev) => [...prev, { senderId: fromUser, text: msg }]);

          // Dodaj do listy rozmówców, jeśli nie ma
          const exists = userListRef.current.some((u) => u.id === fromUser);
          if (!exists) {
            setUserList((prev) => [
              ...prev,
              { id: fromUser, name: userNames[fromUser] || fromUser },
            ]);
          }

          // Ustaw jako aktywnego rozmówcę (jeśli jeszcze nie ma)
          setSelectedUser((curr) => curr ?? fromUser);
        });
      })
      .catch((e) => console.error("Błąd połączenia SignalR:", e));

    setConnection(newConnection);
    setSelectedUser(receiverId);

    return () => {
      newConnection.stop();
    };
  }, [currentUserData]);

  // 📤 Wysyłanie wiadomości
  const sendMessage = async () => {
    if (!connection || !selectedUser || !message) return;

    try {
      await connection.invoke("SendPrivateMessage", selectedUser, message);

      setMessage("");
    } catch (err) {
      console.error("Błąd wysyłania wiadomości:", err);
    }
  };

  return (
    <div className="d-flex h-100">
      {/* Lista rozmówców */}
      <div
        className="border-end p-2"
        style={{ width: "150px", overflowY: "auto" }}
      >
        <h6 className="text-center mb-2">Rozmowy</h6>
        {userList.map((user, idx) => {
          if (user.id === currentUserData.id) return null;

          return (
            <div
              key={idx}
              className={`p-1 rounded text-center mb-1 ${
                selectedUser === user.id ? "bg-primary text-white" : "bg-light"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedUser(user.id)}
            >
              {userNames[user.id]}
            </div>
          );
        })}
      </div>

      {/* Okno czatu */}
      <div className="d-flex flex-column flex-grow-1">
        <div
          className="flex-grow-1 p-2 overflow-auto"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          {currentUserData ? (
            messages.length > 0 ? (
              messages.map((m, idx) => {
                const displayName =
                  m.senderId === currentUserData.id
                    ? "Ty"
                    : userNames[m.senderId] || m.senderId;

                return (
                  <div key={idx}>
                    <strong>{displayName}:</strong> {m.text}
                  </div>
                );
              })
            ) : (
              <div className="text-muted">Brak wiadomości</div>
            )
          ) : (
            <div className="text-muted">Ładowanie użytkownika...</div>
          )}
        </div>

        <div className="border-top p-2 d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Wpisz wiadomość..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage} className="btn btn-primary">
            Wyślij
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersChat;
