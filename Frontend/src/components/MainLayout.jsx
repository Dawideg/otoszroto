import { Outlet } from "react-router-dom";
import NavigationSection from "./MainView/NavigationSection";
import { useState } from "react";
import MessagesPage from "./chat/MessagesPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { fetchUser } from "../api/getData"; // Adjust the import path as necessary
const MainLayout = () => {
  const [showChat, setShowChat] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUser()
      .then((user) => {
        console.log("Pobrano użytkownika:", user);
        setUserData(user);
      })
      .catch((error) => {
        console.error("Błąd pobierania użytkownika:", error);
      });
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationSection
        showChat={showChat}
        setShowChat={setShowChat}
        userData={userData}
      />
      <main className="flex-fill">
        {showChat && <MessagesPage onClose={() => setShowChat(false)} />}

        <Outlet context={userData} />
      </main>
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
