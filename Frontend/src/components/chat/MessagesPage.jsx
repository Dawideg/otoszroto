import { useState } from "react";
import UsersChatList from "./UsersChatList";
import UsersChat from "./UsersChat";

const MessagesPage = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <div
      className="d-flex border rounded overflow-hidden shadow"
      style={{ height: "90vh", maxHeight: "90vh" }}
    >
      {/* Lista użytkowników po lewej */}
      <div
        style={{
          width: "300px",
          borderRight: "1px solid #dee2e6",
          overflowY: "auto",
        }}
      >
        <UsersChatList
          selectedUserId={selectedUserId}
          onSelectUser={setSelectedUserId}
        />
      </div>

      {/* Okno czatu po prawej */}
      <div className="flex-grow-1 d-flex flex-column">
        {selectedUserId ? (
          <UsersChat
            receiverId={selectedUserId}
            setShowChat={() => setSelectedUserId(null)}
          />
        ) : (
          <div className="h-100 d-flex justify-content-center align-items-center text-muted">
            Wybierz rozmówcę z listy
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
