import { HiMiniBars3 } from "react-icons/hi2";

function Header({ toggleSidebar }) {
  return (
    <div className="flex items-center gap-4 border-b border-b-gray-100 bg-white px-4 py-3 duration-300 lg:px-12">
      <button className="p-1 lg:hidden" onClick={toggleSidebar}>
        <HiMiniBars3 className="h-6 w-6" />
      </button>
      <span>Header</span>
    </div>
  );
}

export default Header;
