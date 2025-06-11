import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings.js";
import { useSearchParams } from "react-router-dom";
import { PAGEINCOUNT } from "../../utils/constants.js";

export function useGetBookings() {
  const quertClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const sortByValue = searchParams.get("sortBy");
  const sortBy =
    !sortByValue || sortByValue === "startDate-desc"
      ? null
      : {
          field: "sortBy",
          value: sortByValue,
        };

  const page = +searchParams.get("page") || 1;

  /* queryKey'de, services/apiCabins içinde getCabins'i çağırıyoruz ve
  "cabins" adı altında önbelleğe alıyoruz. Bu bize 3 parça veri döndürür,
  data, isPending ve error */
  const {
    data: bookings,
    isPending,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(bookings?.total / PAGEINCOUNT);
  // PRE FETCHING
  if (page < pageCount) {
    quertClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  // PRE FETCHING
  if (page > 1) {
    quertClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { bookings, isPending, error };
}
