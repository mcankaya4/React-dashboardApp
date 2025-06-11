import { useGetBookings } from "./useGetBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import BookingTableRow from "./BookingTableRow.jsx";
import Pagination from "../../ui/Pagination.jsx";

function BookingTable() {
  const { bookings, isPending } = useGetBookings();

  // Spinner, kabinlerin yükleme durumuna göre görüntülenir.
  if (isPending) return <Spinner />;

  return (
    <Menus>
      <Table columns="grid-cols-[0.6fr_2fr_2.4fr_1.4fr_1fr_32px]">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Table.Body>
          {!bookings?.total && bookings?.total < 1 && (
            <Table.Empty>No reservation was found.</Table.Empty>
          )}
          {bookings?.data.map((booking) => (
            <Table.Row key={booking.id}>
              <BookingTableRow booking={booking} />
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Pagination count={bookings?.total} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
