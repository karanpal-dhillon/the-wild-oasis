import supabase from "./supabase";
export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Could not load the cabins");
  }
  return cabins;
}
