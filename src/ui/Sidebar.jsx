import SidebarNav from "./SidebarNav.jsx";
import Logo from "./Logo.jsx";
import { HiMiniXMark } from "react-icons/hi2";

function Sidebar({ showSidebar, toggleSidebar }) {
  return (
    <aside
      className={`absolute top-0 bottom-0 left-0 z-20 w-[260px] lg:static lg:row-start-1 lg:row-end-[-1] ${showSidebar ? "translate-x-0" : "-translate-x-[260px]"} flex flex-col gap-8 border-r border-r-gray-100 bg-white px-6 py-8 duration-300 lg:translate-x-0`}
    >
      <button
        className="absolute top-4 right-4 p-1 lg:hidden"
        onClick={toggleSidebar}
      >
        <HiMiniXMark className="h-6 w-6" />
      </button>
      <Logo />
      <SidebarNav />
    </aside>
  );
}

export default Sidebar;
