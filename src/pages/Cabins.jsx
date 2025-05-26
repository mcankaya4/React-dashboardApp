import Row from "../ui/Row.jsx";
import CabinList from "../features/cabins/CabinList.jsx";
import AddCabin from "../features/cabins/AddCabin.jsx";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <h1>Cabins</h1>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinList />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
