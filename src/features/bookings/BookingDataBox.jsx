import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers.js";
import DataItem from "../../ui/DataItem.jsx";
import Flag from "../../ui/Flag.jsx";
import { useGetSettings } from "../settings/useGetSettings.js";

function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extraPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guest: {
      fullName: guestName,
      email,
      country,
      phone,
      countryFlag,
      nationalID,
    },
    cabin: { name: cabinName },
  } = booking;

  const { settings } = useGetSettings();

  return (
    <section className="overflow-hidden rounded-md border border-gray-100 bg-white">
      <header className="flex items-center justify-between bg-indigo-500 px-10 py-5 text-lg font-medium text-[#e0e7ff]">
        <div className="flex items-center gap-4 text-lg font-semibold">
          <HiOutlineHomeModern className="h-8 w-8" />
          <p>
            {numNights} nights in Cabin{" "}
            <span className="font-sono ml-1 text-xl">{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </header>

      <section className="px-10 pt-8 pb-3">
        <div className="mb-4 flex items-center gap-3 text-gray-500">
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p className="font-medium text-gray-700">
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
          <span>&bull;</span>
          <p>{phone}</p>
        </div>

        {observations && (
          <DataItem
            icon={
              <HiOutlineChatBubbleBottomCenterText className="h-5 w-5 text-indigo-600" />
            }
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem
          icon={<HiOutlineCheckCircle className="h-5 w-5 text-indigo-600" />}
          label="Breakfast included?"
        >
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <div
          className={`mt-8 flex items-center justify-between rounded-sm px-8 py-4 ${isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
        >
          <DataItem
            icon={
              <HiOutlineCurrencyDollar
                className={`h-6 w-6 ${isPaid ? "text-green-700" : "text-yellow-700"}`}
              />
            }
            label={`Total price`}
          >
            {formatCurrency(
              cabinPrice + settings?.breakfastPrice * numNights || totalPrice,
            )}
            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(settings?.breakfastPrice * numNights || extraPrice)} breakfast)`}
          </DataItem>

          <p className="text-sm font-semibold uppercase">
            {isPaid ? "Paid" : "Will pay at property"}
          </p>
        </div>
      </section>
      <footer className="px-10 py-4 text-right text-xs text-gray-500">
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </footer>
    </section>
  );
}

export default BookingDataBox;
