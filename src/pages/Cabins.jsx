import { useState } from "react";
import Row from "../ui/Row.jsx";
import CabinList from "../features/cabins/CabinList.jsx";
import Button from "../ui/Button.jsx";
import CreateCabinForm from "../features/cabins/CreateCabinForm.jsx";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  function handleShow() {
    setShowForm((cur) => !cur);
  }
  return (
    <>
      <Row type="horizontal">
        <h1>Cabins</h1>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinList />
        <Button onClick={handleShow}>Add new cabin</Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
