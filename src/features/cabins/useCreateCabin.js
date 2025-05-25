import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useCreateCabin() {
  // react query ile kayıt ediyoruz.
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully!");
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

  return { isPending, mutate };
}
