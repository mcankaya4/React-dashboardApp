import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins.js";
import Spinner from "../../ui/Spinner.jsx";
import CabinListHeader from "./CabinListHeader.jsx";
import CabinListItem from "./CabinListItem.jsx";

function CabinList() {
  /* In queryKey, we call getCabins in services/apiCabins, and
  we cache it under the name "cabins". This returns us 3 pieces of data,
  data returned as a result of data, isPending and error */
  const {
    data: cabins,
    isPending,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  // The spinner is displayed according to the loading status of the cabins.
  if (isPending) return <Spinner />;

  return (
    <div
      className="overflow-hidden rounded-lg border border-gray-200 bg-white text-sm"
      role="table"
    >
      <CabinListHeader />
      {cabins.map((cabin) => (
        <CabinListItem key={cabin.id} cabin={cabin} />
      ))}
    </div>
  );
}

export default CabinList;
