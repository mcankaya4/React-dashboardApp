import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCheckin } from "../../services/apiCheckin.js";

export function useUpdateCheckin() {
  // react query ile kayıt ediyoruz.
  const queryClient = useQueryClient();

  const { isUpdating, mutate: editMutate } = useMutation({
    // mutate içerisinde gelecek data'lar birden fazla ise nesne olarak alınır.
    mutationFn: ({ checkinData, id }) => updateCheckin(checkinData, id),
    onSuccess: () => {
      toast.success("Booking checkin successfully!");
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, editMutate };
}
