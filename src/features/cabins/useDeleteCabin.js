import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useDeleteCabin() {
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

  return { isPending, mutate };
}
