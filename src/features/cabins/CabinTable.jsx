import Spinner from "../../ui/Spinner.jsx";
import CabinTableRow from "./CabinTableRow.jsx";
import { useGetCabins } from "./useGetCabins.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import { useSearchParams } from "react-router-dom";
import { sortCabins } from "../../utils/helpers.js";

function CabinTable() {
  // custom hook ile cabins, isPending ve error verilerini alıyoruz.
  const { cabins, isPending } = useGetCabins();

  const [searchParams] = useSearchParams();
  const discount = searchParams.get("discount") || "all";
  const sortBy = searchParams.get("sortBy") || "name-asc";

  const filteredCabins =
    cabins?.filter((cabin) => {
      if (discount === "no-discount") return cabin.discount === 0;
      if (discount === "with-discount") return cabin.discount > 0;
      return true; // "all" ya da bilinmeyen bir değer varsa hepsini göster
    }) || [];

  const sortFn = sortCabins[sortBy] ?? (() => 0);
  const filteredAndSortedCabins = filteredCabins.slice().sort(sortFn);

  // Spinner, kabinlerin yükleme durumuna göre görüntülenir.
  if (isPending) return <Spinner />;

  return (
    <Menus>
      <Table columns="grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr]">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body>
          {!cabins.length && (
            <Table.Empty>No cabin has been added yet.</Table.Empty>
          )}
          {filteredAndSortedCabins.map((cabin) => (
            <Table.Row key={cabin.id}>
              <CabinTableRow cabin={cabin} />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
