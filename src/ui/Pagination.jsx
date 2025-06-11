import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { PAGEINCOUNT } from "../utils/constants.js";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page") ? 1 : +searchParams.get("page");

  const pageCount = Math.ceil(count / PAGEINCOUNT);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }
  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="flex w-full items-center justify-between">
      <p className="ml-2 text-sm">
        Showing{" "}
        <span className="font-semibold">{(currentPage - 1) * PAGEINCOUNT}</span>{" "}
        to{" "}
        <span className="font-semibold">
          {currentPage === pageCount ? count : PAGEINCOUNT * currentPage}
        </span>{" "}
        of <span className="font-semibold">{count}</span> results
      </p>
      <div className="flex gap-1.5">
        <button
          disabled={currentPage === 1}
          onClick={prevPage}
          className="flex items-center justify-center gap-1 rounded-sm border-none px-3 py-1.5 text-sm font-medium duration-300 hover:not-disabled:bg-indigo-600 hover:not-disabled:text-indigo-50"
        >
          <HiChevronLeft className="h-[18px] w-[18px]" />
          <span className="pl-1">Previous</span>
        </button>
        <button
          disabled={currentPage === pageCount}
          onClick={nextPage}
          className="flex items-center justify-center gap-1 rounded-sm border-none px-3 py-1.5 text-sm font-medium duration-300 hover:not-disabled:bg-indigo-600 hover:not-disabled:text-indigo-50"
        >
          <span className="pr-1">Next</span>
          <HiChevronRight className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
