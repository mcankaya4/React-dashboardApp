import { useMoveBack } from "../../hooks/useMoveBack.js";
import Row from "../../ui/Row.jsx";
import Button from "../../ui/Button.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import ButtonText from "../../ui/ButtonText.jsx";
import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner.jsx";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import { useDeleteBooking } from "../bookings/useDeleteBooking.js";
import { useGetBooking } from "../bookings/useGetBooking.js";
import BookingDataBox from "../bookings/BookingDataBox.jsx";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox.jsx";
import { useGetSettings } from "../settings/useGetSettings.js";
import { formatCurrency } from "../../utils/helpers.js";
import { useUpdateCheckin } from "./useUpdateCheckin.js";

function CheckinBooking() {
  const { booking, isPending: isBookingPending } = useGetBooking();
  const { settings, isPending: isSettings } = useGetSettings();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { isPending, mutate: deleteBookingMutate } = useDeleteBooking();
  const { editMutate: updateCheckin } = useUpdateCheckin();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [isBreakfast, setIsBreakfast] = useState(false);

  useEffect(() => {
    if (booking) {
      setConfirmPaid(booking.isPaid);
      setIsBreakfast(booking.hasBreakfast);
    }
  }, [booking]);

  if (isBookingPending || isSettings) return <Spinner />;

  const { id, totalPrice, guest, cabinPrice, numNights } = booking;

  // 🔸 Hesaplamaları memoize et, performans iyileştirir ve okunabilirliği artırır
  const totalBreakfastPrice =
    isBreakfast && settings ? numNights * settings.breakfastPrice : 0;

  const newTotalPrice = cabinPrice + totalBreakfastPrice;

  function handleCheckin() {
    if (!confirmPaid) return;

    const checkinData = {
      status: "checked-in",
      isPaid: true,
      hasBreakfast: isBreakfast,
      extraPrice: totalBreakfastPrice,
      totalPrice: newTotalPrice,
    };

    updateCheckin(
      { checkinData, id },
      {
        onSuccess: ({ id }) => navigate(`/booking/${id}`),
      },
    );
  }

  return (
    <>
      <Row type="horizontal">
        <div className="flex items-center gap-6">
          <h1>Checkin booking #{id}</h1>
        </div>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <div className="rounded-md border border-gray-100 bg-white px-10 py-6">
        <Checkbox
          checked={isBreakfast}
          id="breakfast"
          onChange={() => {
            setIsBreakfast((cur) => !cur);
            setConfirmPaid(false);
          }}
        >
          Want to add breakfast for{" "}
          {formatCurrency(settings?.breakfastPrice * numNights)}?
        </Checkbox>
      </div>

      <div className="rounded-md border border-gray-100 bg-white px-10 py-6">
        <Checkbox
          onChange={() => setConfirmPaid((cur) => !cur)}
          id="confirm"
          checked={confirmPaid}
          disabled={confirmPaid}
        >
          I confirm that {guest.fullName} has paid the total amount of{" "}
          {formatCurrency(newTotalPrice || totalPrice)}{" "}
          {isBreakfast
            ? `(${formatCurrency(cabinPrice)} + ${formatCurrency(totalBreakfastPrice)})`
            : ""}
        </Checkbox>
      </div>

      <ButtonGroup>
        <Button
          disabled={!confirmPaid}
          variation="primary"
          onClick={handleCheckin}
        >
          Check in booking #{id}
        </Button>
        <Modal>
          <Modal.Open opens="delete-booking">
            <Button variation="danger">Delete booing</Button>
          </Modal.Open>
          <Modal.Window name="delete-booking">
            <ConfirmDelete
              onConfirm={() => {
                deleteBookingMutate(id);
                navigate("/bookings");
              }}
              disabled={isPending}
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
