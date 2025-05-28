import Row from "../ui/Row.jsx";
import CabinTable from "../features/cabins/CabinTable.jsx";
import AddCabin from "../features/cabins/AddCabin.jsx";
import CabinTableOperations from "../features/cabins/CabinTableOperations.jsx";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <h1>All cabins</h1>
        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
