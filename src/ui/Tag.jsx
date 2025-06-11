function Tag({ type, children }) {
  const types = {
    unconfirmed: "bg-sky-100 text-sky-700",
    "checked-in": "bg-green-100 text-green-700",
    "checked-out": "bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={`w-fit rounded-full px-3 py-1 text-[11px] font-semibold uppercase ${types[type]}`}
    >
      {children}
    </span>
  );
}

export default Tag;
