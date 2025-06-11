import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Menus from "../../ui/Menus.jsx";
import { useDeleteBooking } from "./useDeleteBooking.js";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers.js";
import Empty from "../../ui/Empty.jsx";
import { format, isToday } from "date-fns";
import Tag from "../../ui/Tag.jsx";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCheckout } from "../../services/apiCheckin.js";
import toast from "react-hot-toast";

function BookingTableRow({ booking }) {
  const {
    id,
    cabin,
    startDate,
    endDate,
    numNights,
    guest,
    status,
    totalPrice,
  } = booking;

  // Cabin silmek için oluşturduğumuz custom hook.
  const { isPending, mutate } = useDeleteBooking();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: checkoutMutate } = useMutation({
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

  if (!booking) return <Empty />;

  return (
    <>
      <div className="font-sono text-base font-semibold text-gray-600">
        {cabin.name}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-medium">{guest.fullName}</span>
        <span className="text-xs text-gray-500">{guest.email}</span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-medium">
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span className="text-xs text-gray-500">
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </div>
      <Tag type={status}>{status.replace("-", " ")}</Tag>
      <div className="font-sono font-medium">{formatCurrency(totalPrice)}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Menus.Button
                icon={<HiEye className="h-4 w-4 text-gray-400 duration-300" />}
                // disabled={isDuplicatePending}
                onClick={() => {
                  navigate(`/booking/${id}`);
                }}
              >
                See details
              </Menus.Button>
              {status === "unconfirmed" && (
                <Menus.Button
                  icon={
                    <HiArrowDownOnSquare className="h-4 w-4 text-gray-400 duration-300" />
                  }
                  onClick={() => {
                    navigate(`/checkin/${id}`);
                  }}
                >
                  Check in
                </Menus.Button>
              )}
              {status === "checked-in" && (
                <Menus.Button
                  icon={
                    <HiArrowUpOnSquare className="h-4 w-4 text-gray-400 duration-300" />
                  }
                  onClick={handleCheckOut}
                >
                  Check out
                </Menus.Button>
              )}
              <Modal.Open opens="delete-booking">
                <Menus.Button
                  icon={
                    <HiTrash className="h-4 w-4 text-gray-400 duration-300" />
                  }
                >
                  Delete
                </Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="delete-booking">
              <ConfirmDelete
                onConfirm={() => {
                  mutate(id);
                }}
                disabled={isPending}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </>
  );
}

export default BookingTableRow;
