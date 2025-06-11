import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings.js";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { isPending, mutate: updateMutate } = useMutation({
    mutationFn: async (newSetting) => {
      const toastId = toast.loading("Updating settings...");
      try {
        const data = await updateSetting(newSetting);
        toast.success("Settings updated successfully!", { id: toastId });
        return data;
      } catch (error) {
        toast.error(error.message || "Failed to update settings", {
          id: toastId,
        });
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
  });

  return { isPending, updateMutate };
}
