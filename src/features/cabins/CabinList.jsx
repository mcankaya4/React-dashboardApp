import Spinner from "../../ui/Spinner.jsx";
import CabinListItem from "./CabinListItem.jsx";
import { useGetCabins } from "./useGetCabins.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";

function CabinList() {
  // custom hook ile cabins, isPending ve error verilerini alıyoruz.
  const { cabins, isPending } = useGetCabins();

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
          {cabins.map((cabin) => (
            <Table.Row key={cabin.id}>
              <CabinListItem cabin={cabin} />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinList;
