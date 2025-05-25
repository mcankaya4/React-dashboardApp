import { formatCurrency } from "../../utils/helpers.js";
import { useState } from "react";
import EditCabinForm from "./EditCabinForm.jsx";
import { useDeleteCabin } from "./useDeleteCabin.js";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin.js";

function CabinListItem({ cabin }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const { id, image, name, capacity, description, regularPrice, discount } =
    cabin;

  // Cabin silmek için oluşturduğumuz custom hook.
  const { isPending, mutate } = useDeleteCabin();

  // Duplicate için useCreateCabin hook kullanıyoruz.
  const { isPending: isDuplicatePending, mutate: duplicateMutate } =
    useCreateCabin();

  function handleShowEditForm() {
    setShowEditForm((show) => !show);
  }

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
      <div
        className="font-sono grid grid-cols-[1fr_2fr_1fr] items-center gap-6 px-6 py-3.5 not-last:border-b not-last:border-b-gray-100 lg:grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr]"
        role="row"
      >
        <img
          src={image}
          alt="Cabin"
          className="block aspect-[3/2] w-12 -translate-x-[7px] scale-[180%] object-cover object-center"
        />
        <div className="text-base font-semibold text-gray-600">{name}</div>
        <div className="hidden font-sans lg:block">
          Fits up to {capacity} guests
        </div>
        <div className="hidden font-semibold lg:block">
          {formatCurrency(regularPrice)}
        </div>
        <div className="hidden font-medium text-green-700 lg:block">
          {discount ? formatCurrency(discount) : <span>&mdash;</span>}
        </div>
        <div className="flex gap-1">
          <button
            className="bg-amber-200 p-2"
            disabled={isDuplicatePending}
            onClick={handleDuplicate}
          >
            <HiSquare2Stack className="h-4 w-4" />
          </button>
          <button onClick={handleShowEditForm} className="bg-emerald-200 p-2">
            <HiPencil className="h-4 w-4" />
          </button>
          <button
            className="bg-red-200 p-2"
            disabled={isPending}
            onClick={() => {
              mutate(id);
            }}
          >
            <HiTrash className="h-4 w-4" />
          </button>
        </div>
      </div>
      {showEditForm && <EditCabinForm cabin={cabin} />}
    </>
  );
}

export default CabinListItem;
