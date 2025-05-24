function Button({
  size = "medium",
  variation = "primary",
  type,
  children,
  onClick,
}) {
  const sizes = {
    small: "text-xs py-1 px-2 uppercase font-semibold text-center",
    medium: "text-sm py-3 px-4 font-medium",
    large: "text-base py-3 px-6 font-medium",
  };

  const variations = {
    primary: "text-indigo-50 bg-indigo-600 hover:bg-indigo-700",
    secondary: "text-grey-600 bg-white border border-gray-200 hover:bg-gray-50",
    danger: "text-red-100 bg-red-700 hover:bg-red-800",
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-sm ${sizes[size]} ${variations[variation]}`}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
