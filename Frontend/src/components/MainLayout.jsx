import { Outlet } from "react-router-dom";
import NavigationSection from "./MainView/NavigationSection";
const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationSection />
      <main className="flex-fill">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
