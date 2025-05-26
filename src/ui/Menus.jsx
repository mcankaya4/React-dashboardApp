import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick.js";

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  function handleClose() {
    setOpenId("");
  }

  return (
    <MenusContext.Provider
      value={{ openId, setOpenId, handleClose, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <div className="flex items-center justify-end">{children}</div>;
}

function Toggle({ id }) {
  const { openId, setOpenId, handleClose, setPosition } =
    useContext(MenusContext);

  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();
    const newPosition = {
      x: window.innerWidth - rect.x + 9,
      y: rect.y - 1.4,
    };
    setPosition(newPosition);
    openId === "" && openId !== id ? setOpenId(id) : handleClose();
  }

  return (
    <button
      onClick={handleClick}
      className="translate-x-2 rounded-sm p-1 duration-200 hover:bg-gray-100"
    >
      <HiEllipsisVertical className="h-6 w-6 text-gray-700" />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, handleClose } = useContext(MenusContext);

  const { window } = useOutsideClick(handleClose);

  if (openId !== id) return null;

  return createPortal(
    <ul
      ref={window}
      className="fixed z-[1000] rounded-md bg-white shadow-md"
      style={{ top: `${position.y}px`, right: `${position.x}px` }}
    >
      {children}
    </ul>,
    document.body,
  );
}

function Button({ children, icon, onClick }) {
  const { handleClose } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    handleClose();
  }

  return (
    <li>
      <button
        className="flex w-full items-center gap-4 px-6 py-3 text-left text-sm duration-200 hover:bg-gray-50"
        onClick={handleClick}
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
