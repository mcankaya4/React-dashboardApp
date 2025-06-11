// All select cabins
import { APIURL } from "../utils/constants.js";

export async function getCabins() {
  const res = await fetch(`${APIURL}/cabins`);

  if (!res.ok) {
    const error = await res.json();
    console.error(error);
    throw new Error("Could not get cabins from Laravel API");
  }

  return await res.json();
}

// Create cabin
export async function createCabin(newCabin) {
  const formData = new FormData();

  Object.entries(newCabin).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const res = await fetch(`${APIURL}/cabins`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  return await res.json();
}

// Edit cabin
export async function updateCabin(newCabin, id) {
  const formData = new FormData();

  // Laravel'e method spoofing için ekle
  formData.append("_method", "PUT");

  Object.entries(newCabin).forEach(([key, value]) => {
    if (key === "image") {
      if (value instanceof File) {
        formData.append("image", value);
      }
    } else {
      formData.append(key, value);
    }
  });

  const res = await fetch(`${APIURL}/cabins/${id}`, {
    method: "POST", // PUT yerine POST, çünkü FormData ile PUT sıkıntı çıkarabiliyor
    body: formData,
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    console.error(error);
    throw new Error("Cabin could not be updated");
  }

  return await res.json();
}

// Delete cabin (id params)
export async function deleteCabin(cabinId) {
  const res = await fetch(`${APIURL}/cabins/${cabinId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    console.error(error);
    throw new Error("Cabin could not be deleted from Laravel API");
  }

  return await res.json();
}
