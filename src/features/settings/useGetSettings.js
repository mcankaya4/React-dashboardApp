import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings.js";

export function useGetSettings() {
  /* queryKey'de, services/apiCabins içinde getCabins'i çağırıyoruz ve
  "cabins" adı altında önbelleğe alıyoruz. Bu bize 3 parça veri döndürür,
  data, isPending ve error */
  const {
    data: settings,
    isPending,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, isPending, error };
}
