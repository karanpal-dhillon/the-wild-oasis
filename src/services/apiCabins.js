import supabase, { supabaseUrl } from "./supabase";
export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Could not load the cabins");
  }
  return cabins;
}

export async function deleteCabin(cabinId) {
  const { error } = await supabase.from("cabins").delete().eq("id", cabinId);
  if (error) {
    console.error(error);
    throw new Error("Could not delete the cabin");
  }
}

export async function createCabin(newCabin) {
  const imageName = Math.random() + newCabin.image.name.replaceAll("/", "");
  const imageUrl = `${supabaseUrl}/storage/v1/object/public/cabinImages/${imageName}`;
  const { error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imageUrl }])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Could not create the cabin");
  }
  const { error: storageError } = await supabase.storage
    .from("cabinImages")
    .upload(imageName, newCabin.image, {
      cacheControl: "3600",
      upsert: false,
    });
  if (storageError) {
    throw new Error("Could not upload image");
  }
}
