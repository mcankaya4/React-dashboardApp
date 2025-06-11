import { useMoveBack } from "../../hooks/useMoveBack.js";
import Tag from "../../ui/Tag.jsx";
import Row from "../../ui/Row.jsx";
import Button from "../../ui/Button.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import ButtonText from "../../ui/ButtonText.jsx";
import BookingDataBox from "./BookingDataBox.jsx";
import { useGetBooking } from "./useGetBooking.js";
import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner.jsx";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import { useDeleteBooking } from "./useDeleteBooking.js";
import Menus from "../../ui/Menus.jsx";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCheckout } from "../../services/apiCheckin.js";
import toast from "react-hot-toast";

function BookingDetail() {
  const moveBack = useMoveBack();
  const { isPending, mutate } = useDeleteBooking();
  const navigate = useNavigate();

  const { booking, isPending: isBookingPending } = useGetBooking();

  const queryClient = useQueryClient();

  const { isPending: isCheckoutPending, mutate: checkoutMutate } = useMutation({
    mutationFn: (id) => updateCheckout(id),
    onSuccess: () => {
      toast.success("Checkout successfully.");
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleCheckOut() {
    checkoutMutate(id);
  }

  if (isBookingPending || isCheckoutPending) return <Spinner />;

  const { id, status } = booking;

  return (
    <>
      <Row type="horizontal">
        <div className="flex items-center gap-6">
          <h1>Booking #{id}</h1>
          <Tag type={status}>{status.replace("-", " ")}</Tag>
        </div>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "checked-in" && (
          <Button variation="primary" onClick={handleCheckOut}>
            Check out
          </Button>
        )}
        {status === "unconfirmed" && (
          <Button
            variation="primary"
            onClick={() => {
              navigate(`/checkin/${id}`);
            }}
          >
            Check in
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete-booking">
            <Button variation="danger">Delete booing</Button>
          </Modal.Open>
          <Modal.Window name="delete-booking">
            <ConfirmDelete
              onConfirm={() => {
                mutate(id);
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

export default BookingDetail;
