import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: async (id) => {
      // 1. Kullanıcıya yükleniyor mesajı göster
      const toastId = toast.loading("Deleting...");

      try {
        await deleteCabin(id);
        // 2. Başarılıysa aynı toast'ı ID üzerinden güncelle
        toast.success("Cabin deleted", { id: toastId });
      } catch (error) {
        // 3. Hata varsa hata mesajı göster
        toast.error(error.message, { id: toastId });
        throw error; // React Query'nin hata yakalaması için
      }
    },
    onSuccess: () => {
      // 4. Cache’i güncelle
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });

  return { isPending, mutate };
}
