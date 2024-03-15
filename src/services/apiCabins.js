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
  const { data, error } = await supabase
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
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Could not upload image");
  }
}

export async function updateCabin(data) {
  const { cabin, id } = data;
  if (typeof cabin.image === "object") {
    const fileName = Math.random() + cabin.image[0].name.replaceAll("/", "");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabinImages/${fileName}`;
    const { _data, error } = await supabase
      .from("cabins")
      .update({ ...cabin, image: imagePath })
      .eq("id", id)
      .select();
    if (error) {
      throw new Error("Cabin could not be updated");
    }
    const { error: storageError } = await supabase.storage
      .from("cabinImages")
      .upload(fileName, cabin.image[0]);
    if (storageError) {
      throw new Error("Image could not be uploaded");
    }
  } else {
    const { _data, error } = await supabase
      .from("cabins")
      .update({ ...cabin })
      .eq("id", id)
      .select();
    if (error) {
      throw new Error("Cabin could not be updated");
    }
  }
}
// export async function updateCabin(updatedCabin, id) {
//   let uploadImage = false;
//   if (
//     typeof updatedCabin.image !== "string" ||
//     !updatedCabin.image.startsWith(supabaseUrl)
//   ) {
//     const imageName =
//       Math.random() + updatedCabin.image[0].name.replaceAll("/", "");
//     const imagePath = `${supabaseUrl}/storage/v1/object/public/cabinImages/${imageName}`;
//     updatedCabin.image = imagePath;
//     uploadImage = true;
//   }
//   const { _data, error } = await supabase
//     .from("cabins")
//     .update({ updatedCabin })
//     .eq("id", id)
//     .select();
//   if (error) {
//     throw new Error("Cabin could not be updated");
//   }
//   if(uploadImage){
//   const { error: storageError } = await supabase.storage
//     .from("cabinImages")
//     .upload(imageName,updatedCabin.image, {
//       cacheControl: "3600",
//       upsert: false,
//     });
//   if (storageError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     throw new Error("Could not upload image");
//   }
//
//   }
// }
