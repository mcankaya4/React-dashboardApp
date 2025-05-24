function Sidebar({ showSidebar, toggleSidebar }) {
  return (
    <aside
      className={`absolute top-0 bottom-0 left-0 w-[260px] bg-red-50 lg:static lg:row-start-1 lg:row-end-[-1] lg:block ${showSidebar ? "translate-x-0" : "-translate-x-[260px]"} duration-300 lg:translate-x-0`}
    >
      Sidebar Page
      <button className="lg:hidden" onClick={toggleSidebar}>
        Kpaat
      </button>
    </aside>
  );
}

export default Sidebar;
