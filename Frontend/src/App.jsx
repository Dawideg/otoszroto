import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import CarListView from "./components/MainView/CarListView";
import SingleAnnouncementView from "./components/SingleAnnouncementView/SingleAnnouncementView";
import MainLayout from "./components/MainLayout";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<CarListView />} />
            <Route
              path="announcement/:id"
              element={<SingleAnnouncementView />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
