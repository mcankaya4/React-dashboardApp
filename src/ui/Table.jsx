import { createContext, useContext } from "react";

const TableContext = createContext();

function Table({ children, columns }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        className="overflow-hidden rounded-md border border-gray-200 bg-white text-sm"
        role="table"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <header
      className={`grid items-center gap-6 border-b border-b-gray-100 bg-gray-50 px-6 py-5 font-semibold tracking-[0.4px] text-gray-600 uppercase lg:px-6 ${columns}`}
      role="row"
    >
      {children}
    </header>
  );
}

function Body({ children }) {
  return <section className="my-1">{children}</section>;
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      role="row"
      className={`grid items-center gap-6 px-6 py-3.5 not-last:border-b not-last:border-b-gray-100 ${columns}`}
    >
      {children}
    </div>
  );
}

function Footer({ children }) {
  return (
    <footer className="flex justify-center bg-gray-50 p-3">{children}</footer>
  );
}

function Empty({ children }) {
  return (
    <div className="m-6 text-center text-base font-medium">{children}</div>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;
Table.Empty = Empty;

export default Table;
