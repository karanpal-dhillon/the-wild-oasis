import BookingTable from "../features/bookings/BookingTable";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Bookings = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <BookingTable />
      </Row>
    </>
  );
};

export default Bookings;
