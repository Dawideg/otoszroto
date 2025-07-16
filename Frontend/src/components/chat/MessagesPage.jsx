import { useEffect, useRef, useState } from "react";
import UsersChatList from "./UsersChatList";
import UsersChat from "./UsersChat";

const MessagesPage = ({ onClose }) => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const wrapperRef = useRef(null); // Ref do całego komponentu

  // Efekt: zamykanie po kliknięciu poza całym oknem czatu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClose(); // Zamyka cały MessagesPage
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={wrapperRef}
      className="d-flex border rounded overflow-hidden shadow position-fixed top-50 start-50 translate-middle bg-white"
      style={{
        height: "90vh",
        width: "80vw",
        maxHeight: "90vh",
        zIndex: 1050,
      }}
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
