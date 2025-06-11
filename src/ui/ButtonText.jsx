function ButtonText({ children, onClick }) {
  return (
    <button
      className="rounded-sm border-none bg-none text-center font-medium text-indigo-600 duration-300 hover:text-indigo-700 active:text-indigo-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonText;
