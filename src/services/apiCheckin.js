// Update checkin info
import { APIURL } from "../utils/constants.js";

export async function updateCheckin(updatedData, id) {
  const res = await fetch(`${APIURL}/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error(error);
    throw new Error("Check-in bilgisi güncellenemedi");
  }

  return await res.json();
}

export async function updateCheckout(id) {
  const res = await fetch(`${APIURL}/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      status: "checked-out",
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error(error);
    throw new Error("Check-out işlemi başarısız");
  }

  return await res.json();
}
