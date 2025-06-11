import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings.js";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: async (id) => {
      // 1. Kullanıcıya yükleniyor mesajı göster
      const toastId = toast.loading("Deleting...");

      try {
        await deleteBooking(id);
        // 2. Başarılıysa aynı toast'ı ID üzerinden güncelle
        toast.success("Booking deleted", { id: toastId });
      } catch (error) {
        // 3. Hata varsa hata mesajı göster
        toast.error(error.message, { id: toastId });
        throw error; // React Query'nin hata yakalaması için
      }
    },
    onSuccess: () => {
      // 4. Cache’i güncelle
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });

  return { isPending, mutate };
}
