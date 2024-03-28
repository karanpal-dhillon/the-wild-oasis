import supabase from "./supabase";
export async function getBookings() {
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*, cabin:cabins(name), guest:guests(fullName, email)");
  if (error) throw new Error("Could not fetch bookings");
  return bookings;
}
