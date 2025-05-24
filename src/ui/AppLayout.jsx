import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import Main from "./Main.jsx";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function AppLayout() {
  const [showSidebar, setShowSidebar] = useState(false);
  function toggleSidebar() {
    setShowSidebar((cur) => !cur);
  }
  return (
    <div className="grid h-dvh grid-rows-[auto_1fr] lg:grid-cols-[260px_1fr]">
      <Header showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}

export default AppLayout;
