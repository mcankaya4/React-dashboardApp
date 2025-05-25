import supabase from "./supabase.js";

// Get settings selected has id=1
export async function getSettings() {
  // Bunun iç kısmını supabase'den hazır alıyoruz.
  // id'si 1 olan settings'i çekiyoruz.
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Could not get cabins from supabase");
  }
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
