import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import BookingRow from "./BookingRow";
import { useBookings } from "./useBookings";

const BookingTable = () => {
  const { bookings, isLoading } = useBookings();
  if (isLoading) return <Spinner />;
  return (
    <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
      <Table.Header>
        <div>Cabin</div>
        <div>Guests</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={bookings}
        render={(booking) => <BookingRow key={booking.id} booking={booking} />}
      />
    </Table>
  );
};

export default BookingTable;
