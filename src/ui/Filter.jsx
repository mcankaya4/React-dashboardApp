import { useSearchParams } from "react-router-dom";

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(value) {
    // 1. Parametre dinamik bir değişken
    searchParams.set(filterField, value);
    setSearchParams(searchParams); // güncellenmiş params'ı set et
  }

  const activeTab = searchParams.get(filterField) || options.at(0).value;

  return (
    <div className="flex gap-1 rounded-sm border border-gray-100 bg-white p-1 shadow-sm">
      {options.map((option) => (
        <button
          className={`rounded-sm border-none px-2 py-[4.4px] text-sm font-medium duration-300 hover:not-disabled:bg-indigo-600 hover:not-disabled:text-indigo-50 ${activeTab === option.value ? "bg-indigo-600 text-indigo-50" : "bg-white"}`}
          onClick={() => {
            handleClick(option.value);
          }}
          key={option.value}
          disabled={activeTab === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
