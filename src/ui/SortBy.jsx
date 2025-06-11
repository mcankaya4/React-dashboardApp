import Select from "./Select.jsx";
import { useSearchParams } from "react-router-dom";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);

    if (searchParams.get("page")) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }
  }

  return <Select options={options} onChange={handleChange} value={sortBy} />;
}

export default SortBy;
