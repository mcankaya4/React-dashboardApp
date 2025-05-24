function Row({ type = "vertical", children }) {
  const stil = {
    vertical: "flex flex-col gap-4",
    horizontal: "flex items-center justify-between",
  };
  return <div className={stil[type]}>{children}</div>;
}

export default Row;
