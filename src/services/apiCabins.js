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

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image?.name?.replaceAll(
    "/",
    "",
  )}`;
  const imageUrl = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabinImages/${imageName}`;

  let query = supabase.from("cabins");
  if (!id) {
    query = query.insert([{ ...newCabin, image: imageUrl }]);
  } else if (id) {
    query = query.update({ ...newCabin, image: imageUrl }).eq("id", id);
  }
  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error("Could not create the cabin");
  }
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabinImages")
    .upload(imageName, newCabin.image, {
      cacheControl: "3600",
      upsert: false,
    });
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Could not upload image");
  }
}

export async function updateCabin(cabin, cabinId) {
  const { _data, error } = await supabase
    .from("cabins")
    .update(cabin)
    .eq("id", cabinId)
    .select();
  if (error) {
    throw new Error("Could not update the cabin");
  }
}
