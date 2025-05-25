import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins.js";

export function useGetCabins() {
  /* queryKey'de, services/apiCabins içinde getCabins'i çağırıyoruz ve
  "cabins" adı altında önbelleğe alıyoruz. Bu bize 3 parça veri döndürür,
  data, isPending ve error */
  const {
    data: cabins,
    isPending,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, isPending, error };
}
