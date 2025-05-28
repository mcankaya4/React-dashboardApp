import { formatCurrency } from "../../utils/helpers.js";
import { useDeleteCabin } from "./useDeleteCabin.js";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin.js";
import Modal from "../../ui/Modal.jsx";
import UpdateCabinForm from "./UpdateCabinForm.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Menus from "../../ui/Menus.jsx";

function CabinTableRow({ cabin }) {
  const { id, image, name, capacity, description, regularPrice, discount } =
    cabin;

  // Cabin silmek için oluşturduğumuz custom hook.
  const { isPending, mutate } = useDeleteCabin();

  // Duplicate için useCreateCabin hook kullanıyoruz.
  const { isPending: isDuplicatePending, mutate: duplicateMutate } =
    useCreateCabin();

  function handleDuplicate() {
    duplicateMutate({
      name: `Copy of ${name}`,
      capacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <img
        src={image}
        alt="Cabin"
        className="block aspect-[3/2] w-12 -translate-x-[7px] scale-[215%] object-cover object-center"
      />
      <div className="font-sono text-base font-semibold text-gray-600">
        {name}
      </div>
      <div>Fits up to {capacity} guests</div>
      <div className="font-sono font-semibold">
        {formatCurrency(regularPrice)}
      </div>
      <div className="font-sono font-medium text-green-700">
        {discount ? formatCurrency(discount) : <span>&mdash;</span>}
      </div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Menus.Button
                icon={
                  <HiSquare2Stack className="h-4 w-4 text-gray-400 duration-300" />
                }
                disabled={isDuplicatePending}
                onClick={handleDuplicate}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="update-cabin-form">
                <Menus.Button
                  icon={
                    <HiPencil className="h-4 w-4 text-gray-400 duration-300" />
                  }
                >
                  Edit
                </Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete-cabin">
                <Menus.Button
                  icon={
                    <HiTrash className="h-4 w-4 text-gray-400 duration-300" />
                  }
                >
                  Delete
                </Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="update-cabin-form">
              <UpdateCabinForm cabin={cabin} />
            </Modal.Window>

            <Modal.Window name="delete-cabin">
              <ConfirmDelete
                onConfirm={() => {
                  mutate(id);
                }}
                disabled={isPending}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </>
  );
}

export default CabinTableRow;
