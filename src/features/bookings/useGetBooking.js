import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings.js";
import { useParams } from "react-router-dom";

export function useGetBooking() {
  const { bookingId } = useParams();

  const {
    data: booking,
    isPending,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    enabled: !!bookingId,
    retry: false,
  });

  return { booking, isPending, error };
}
