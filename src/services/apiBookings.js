// All select bookings
import { APIURL, PAGEINCOUNT } from "../utils/constants.js";

export async function getBooking(id) {
  const res = await fetch(`${APIURL}/bookings/${id}`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    console.error(error);
    throw new Error("Could not get booking from Laravel API");
  }

  return await res.json();
}

export async function getBookings({ filter, sortBy, page }) {
  let url = `${APIURL}/bookings`;
  const queryParams = [];

  // 🔹 Status filtresi
  if (filter?.field === "status" && filter?.value && filter.value !== "all") {
    queryParams.push(`status=${encodeURIComponent(filter.value)}`);
  }

  // 🔹 Sıralama
  if (sortBy?.value) {
    queryParams.push(`sortBy=${encodeURIComponent(sortBy.value)}`);
  }

  // 🔹 Sayfalama (sadece sayı olacak)
  if (page) {
    queryParams.push(`page=${encodeURIComponent(page)}`);
    queryParams.push(`perPage=${PAGEINCOUNT}`);
  }

  if (queryParams.length > 0) {
    url += `?${queryParams.join("&")}`;
  }

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    console.error(error);
    throw new Error("Could not get bookings from Laravel API");
  }

  return await res.json();
}

// Delete booking (id params)
export async function deleteBooking(bookingId) {
  const res = await fetch(`${APIURL}/bookings/${bookingId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    console.error(error);
    throw new Error("Cannot delete booking from Laravel API");
  }

  return await res.json();
}
