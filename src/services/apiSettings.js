import { APIURL } from "../utils/constants.js";

export async function getSettings() {
  const res = await fetch(`${APIURL}/settings`);

  if (!res.ok) {
    throw new Error("Could not fetch settings from Laravel API");
  }

  return await res.json();
}

// newSetting örneği: { minBookingLenght: 2 }
export async function updateSetting(newSetting) {
  const res = await fetch(`${APIURL}/settings`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSetting),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error(errorData);
    throw new Error("Settings could not be updated");
  }

  return await res.json();
}
