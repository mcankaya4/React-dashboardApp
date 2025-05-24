import { formatCurrency } from "../../utils/helpers.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";

function CabinListItem({ cabin }) {
  const { id, image, name, capacity, regularPrice: price, discount } = cabin;

  // We include queryClient for the refresh after the deletion.
  const queryClient = useQueryClient();

  // isPending replaces the loading logic
  // Fn where we execute the deleteCabin function by giving id in mutate
  const { isPending, mutate } = useMutation({
    // mutationFn: (id) => deleteCabin(id),
    mutationFn: deleteCabin,
    // If the operation is successful
    onSuccess: () => {
      toast.success("Cabin deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    // If the operation fails
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
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
        {formatCurrency(price)}
      </div>
      <div className="hidden font-medium text-green-700 lg:block">
        {formatCurrency(discount)}
      </div>
      <div>
        <button
          disabled={isPending}
          onClick={() => {
            mutate(id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CabinListItem;
