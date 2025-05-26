import Button from "../../ui/Button.jsx";
import Modal from "../../ui/Modal.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="create-cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="create-cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
