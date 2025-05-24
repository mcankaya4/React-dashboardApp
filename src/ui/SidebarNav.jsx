import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

function SidebarNav() {
  return (
    <ul className="flex flex-col gap-2">
      <li>
        <NavLink
          className="sidebar group flex items-center gap-3 px-6 py-3 text-base font-medium text-gray-600 duration-300 hover:rounded-sm hover:bg-gray-50 hover:text-gray-800"
          to="/dashboard"
        >
          <HiOutlineHome className="h-6 w-6 text-gray-400 duration-300 group-hover:text-indigo-600 group-[.active]:text-indigo-600" />
          <span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className="sidebar group flex items-center gap-3 px-6 py-3 text-base font-medium text-gray-600 duration-300 hover:rounded-sm hover:bg-gray-50 hover:text-gray-800"
          to="/bookings"
        >
          <HiOutlineCalendarDays className="h-6 w-6 text-gray-400 duration-300 group-hover:text-indigo-600 group-[.active]:text-indigo-600" />
          <span>Bookings</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className="sidebar group flex items-center gap-3 px-6 py-3 text-base font-medium text-gray-600 duration-300 hover:rounded-sm hover:bg-gray-50 hover:text-gray-800"
          to="/cabins"
        >
          <HiOutlineHomeModern className="h-6 w-6 text-gray-400 duration-300 group-hover:text-indigo-600 group-[.active]:text-indigo-600" />
          <span>Cabins</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className="sidebar group flex items-center gap-3 px-6 py-3 text-base font-medium text-gray-600 duration-300 hover:rounded-sm hover:bg-gray-50 hover:text-gray-800"
          to="/users"
        >
          <HiOutlineUsers className="h-6 w-6 text-gray-400 duration-300 group-hover:text-indigo-600 group-[.active]:text-indigo-600" />
          <span>Users</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className="sidebar group flex items-center gap-3 px-6 py-3 text-base font-medium text-gray-600 duration-300 hover:rounded-sm hover:bg-gray-50 hover:text-gray-800"
          to="/settings"
        >
          <HiOutlineCog6Tooth className="h-6 w-6 text-gray-400 duration-300 group-hover:text-indigo-600 group-[.active]:text-indigo-600" />
          <span>Settings</span>
        </NavLink>
      </li>
    </ul>
  );
}

export default SidebarNav;
