import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings.js";

export function useUpdateSettings() {
  // react query ile kayıt ediyoruz.
  const queryClient = useQueryClient();

  const { isPending, mutate: updateMutate } = useMutation({
    // mutate içerisinde gelecek data'lar birden fazla ise nesne olarak alınır.
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
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

  return { isPending, updateMutate };
}
