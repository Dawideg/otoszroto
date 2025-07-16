import { Outlet } from "react-router-dom";
import NavigationSection from "./MainView/NavigationSection";
import { useState } from "react";
import MessagesPage from "./chat/MessagesPage";
const MainLayout = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationSection showChat={showChat} setShowChat={setShowChat} />
      <main className="flex-fill">
        {showChat && <MessagesPage />}
        <Outlet context={showChat} />
      </main>
    </div>
  );
};

export default MainLayout;
