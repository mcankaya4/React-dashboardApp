import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useEditCabin() {
  // react query ile kayıt ediyoruz.
  const queryClient = useQueryClient();

  const { isPending, mutate: editMutate } = useMutation({
    // mutate içerisinde gelecek data'lar birden fazla ise nesne olarak alınır.
    mutationFn: ({ newCabinData, id }) => editCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      // kayıt başarılıysa formu sıfırla
      // reset'i hook'a parametre olarak alabiliriz fakat almayıp diğer tarafta
      // çalıştıracağız.
      // reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, editMutate };
}
