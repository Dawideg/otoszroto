import { Outlet } from "react-router-dom";
import NavigationSection from "./MainView/NavigationSection";
import { useState } from "react";
import MessagesPage from "./chat/MessagesPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MainLayout = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationSection showChat={showChat} setShowChat={setShowChat} />
      <main className="flex-fill">
        {showChat && <MessagesPage onClose={() => setShowChat(false)} />}

        <Outlet context={showChat} />
      </main>
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
