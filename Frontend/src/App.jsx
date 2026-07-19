import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import CarListView from "./components/MainView/CarListView";
import MainLayout from "./components/MainLayout";
import SingleAnnouncementView from "./components/SingleAnnouncementView/SingleAnnouncementView";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginView from "./components/auth/Login/LoginView";
import RegisterView from "./components/auth/Register/RegisterView";
import AddAnnouncementView from "./components/AddAnnouncement/AddAnnouncementView";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop></ScrollToTop>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<CarListView />} />
            <Route
              path="announcement/:id"
              element={<SingleAnnouncementView />}
            />
            <Route path="login" element={<LoginView />} />
            <Route path="register" element={<RegisterView />} />
            <Route path="add-announcement" element={<AddAnnouncementView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
