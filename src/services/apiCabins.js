import supabase, { supabaseUrl } from "./supabase.js";

// All select cabins
export async function getCabins() {
  // Bunun iç kısmını supabase'den hazır alıyoruz.
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Could not get cabins from supabase");
  }
  return data;
}

// Create cabin
export async function createCabin(newCabin) {
  const imgName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const imgPath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert({ ...newCabin, image: imgPath })
    .select();
  if (error) {
    console.log(error);
    throw new Error("Cannot create cabin from supabase");
  }

  // upload img
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imgName, newCabin.image);

  // image yükleme hatası var ise data.id'ye ait elemanı siliyoruz.
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("storageImage cannot be deleted");
  }
  return data;
}

// Delete cabin (id params)
export async function deleteCabin(cabinId) {
  // Bunun iç kısmını supabase'den hazır alıyoruz. Fakat izinler düzenlenmesi gerekir.
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabinId);
  if (error) {
    console.log(error);
    throw new Error("Cannot delete cabin from supabase");
  }
  return data;
}
