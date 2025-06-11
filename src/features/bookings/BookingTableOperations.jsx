import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField={"status"}
        options={[
          { label: "All", value: "all" },
          { label: "Checked out", value: "checked-out" },
          { label: "Checked in", value: "checked-in" },
          { label: "Unconfirmed", value: "unconfirmed" },
        ]}
      />
      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          { value: "totalPrice-desc", label: "Sort by amount (high first)" },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
