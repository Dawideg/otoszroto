import { useEffect, useState } from "react";
import { fetchUser, fetchAllChatHistory } from "../../api/getData";
import { all } from "axios";

const ChatList = ({ selectedUserId, onSelectUser }) => {
  const [conversations, setConversations] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const currentUser = await fetchUser();
      setCurrentUserId(currentUser.id);
      const userMap = { [currentUser.id]: "Ty" };

      const allConversations = new Map();

      const history = await fetchAllChatHistory();
      for (const msg of history) {
        const otherUserId =
          msg.senderId === currentUser.id ? msg.receiverId : msg.senderId;

        if (!allConversations.has(otherUserId)) {
          allConversations.set(otherUserId, msg);
          console.log(allConversations);
        }

        if (!userMap[otherUserId]) {
          const user = await fetchUser(otherUserId);
          userMap[otherUserId] = user.name;
        }
      }

      setConversations(Array.from(allConversations.entries()));
      setUserNames(userMap);
    };

    loadData();
  }, []);

  return (
    <div className="border rounded bg-white p-2" style={{ width: "300px" }}>
      <h5 className="mb-3">Wiadomości</h5>
      {conversations.length === 0 ? (
        <div className="text-muted">Brak konwersacji</div>
      ) : (
        conversations.map(
          ([userId, lastMsg]) =>
            userId !== currentUserId && (
              <div
                key={userId}
                className={`p-2 rounded mb-2 cursor-pointer ${
                  selectedUserId === userId
                    ? "bg-primary text-white"
                    : "bg-light"
                }`}
                onClick={() => onSelectUser(userId)}
                style={{ cursor: "pointer" }}
              >
                <div className="fw-bold">{userNames[userId]}</div>
                <div
                  className="text-truncate"
                  style={{ maxWidth: "100%", fontSize: "0.9rem" }}
                >
                  {lastMsg.text}
                </div>
              </div>
            )
        )
      )}
    </div>
  );
};

export default ChatList;
