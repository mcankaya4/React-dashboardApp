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

// // Create cabin
// export async function createEditCabin(newCabin, id) {
//   const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
//
//   const imgName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
//   const imgPath = hasImagePath
//     ? newCabin.image
//     : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`;
//
//   let query = supabase.from("cabins");
//
//   // Create
//   if (!id) query = query.insert({ ...newCabin, image: imgPath });
//
//   // Edit
//   if (id) query = query.update({ ...newCabin, image: imgPath }).eq("id", id);
//
//   const { data, error } = await query.select().single();
//
//   if (error) {
//     console.log(error);
//     throw new Error("Cannot create cabin from supabase");
//   }
//
//   // upload img
//   const { error: storageError } = await supabase.storage
//     .from("cabin-images")
//     .upload(imgName, newCabin.image);
//
//   // image yükleme hatası var ise data.id'ye ait elemanı siliyoruz.
//   if (storageError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     console.log(storageError);
//     throw new Error("storageImage cannot be deleted");
//   }
//   return data;
// }

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

// Edit cabin
export async function editCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // Image güncellenmediyse aynı kaydet, güncelleme varsa yeni path ve name belirle.
  const imgName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const imgPath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`;

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...newCabin, image: imgPath })
    .eq("id", id)
    .select()
    .single();

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
