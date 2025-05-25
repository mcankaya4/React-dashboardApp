import Spinner from "../../ui/Spinner.jsx";
import CabinListHeader from "./CabinListHeader.jsx";
import CabinListItem from "./CabinListItem.jsx";
import { useGetCabins } from "./useGetCabins.js";

function CabinList() {
  // custom hook ile cabins, isPending ve error verilerini alıyoruz.
  const { cabins, isPending } = useGetCabins();

  // Spinner, kabinlerin yükleme durumuna göre görüntülenir.
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
