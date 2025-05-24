function Header({ toggleSidebar }) {
  return (
    <div className="border-b border-b-gray-100 bg-white px-12 py-3 duration-300">
      <button className="lg:hidden" onClick={toggleSidebar}>
        sidebar toogle
      </button>
      <span>Header</span>
    </div>
  );
}

export default Header;
