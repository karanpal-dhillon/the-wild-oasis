import supabase from "../services/supabase";
import Button from "../ui/Button";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";
import { bookings } from "./data-bookings";

import Row from "../ui/Row";
import { subtractDates } from "../utils/helpers";
import { isFuture, isPast, isToday } from "date-fns";
import { useState } from "react";

function handleError(error) {
  console.log(error);
  alert(error.message);
}
async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) handleError(error);
}

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) handleError(error);
}

async function deleteBookings() {
  console.log(`deleting bookings...`);
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) handleError(error);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) handleError(error);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) handleError(error);
}

async function createBookings() {
  const { data: cabinIds, _error } = await supabase
    .from("cabins")
    .select("id")
    .order("id");

  const allCabinIds = cabinIds.map((cabin) => cabin.id);
  const { data: guestIds, _ } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestIds.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const extrasPrice = booking.hasBreakfast
      ? 15 * numNights * booking.numGuests
      : 0;
    const cabinId = allCabinIds[booking.cabinId - 1];
    const guestId = allGuestIds[booking.guestId - 1];
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const totalPrice = cabinPrice + extrasPrice;
    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    ) {
      status = "checked-out";
    }
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    ) {
      status = "unconfirmed";
    }
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    ) {
      status = "checked-in";
    }
    return {
      ...booking,
      numNights,
      status,
      extrasPrice,
      totalPrice,
      cabinId,
      cabinPrice,
      guestId,
    };
  });
  // console.log(finalBookings);
  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) handleError(error);
}

const Uploader = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function upload() {
    setIsLoading(true);
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    await createCabins();
    await createGuests();
    await createBookings();
    setIsLoading(false);
  }
  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>Sample data</h3>
      <Button onClick={upload} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload All"}
      </Button>
      <Button>Upload only bookings</Button>
    </div>
  );
};

export default Uploader;
