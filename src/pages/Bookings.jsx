import Row from "../ui/Row.jsx";
import BookingTableOperations from "../features/bookings/BookingTableOperations.jsx";
import BookingTable from "../features/bookings/BookingTable.jsx";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <h1>All bookings</h1>
        <BookingTableOperations />
      </Row>

      <Row>
        <BookingTable />
      </Row>
    </>
  );
}

export default Bookings;
