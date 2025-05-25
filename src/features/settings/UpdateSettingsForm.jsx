import FormRow from "../../ui/FormRow.jsx";
import { useGetSettings } from "./useGetSettings.js";
import Spinner from "../../ui/Spinner.jsx";
import { useUpdateSettings } from "./useUpdateSettings.js";
import FormInput from "../../ui/FormInput.jsx";
import Form from "../../ui/Form.jsx";

function UpdateSettingsForm() {
  // settings'leri çekiyoruz. her ihtimale karşı boş dizi veriyoruz varsayılan olarak.
  const {
    isPending,
    settings: {
      minBookingLenght,
      maxBookingLenght,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useGetSettings();

  const { isUpdating, updateMutate } = useUpdateSettings();

  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateMutate({ [field]: value });
  }

  if (isPending) return <Spinner />;

  return (
    <div className="overflow-hidden rounded-lg bg-white text-sm shadow-xs">
      <Form>
        <FormRow>
          <FormInput
            label="Minimum nights/booking"
            id="minBookingLenght"
            type="number"
            defaultValue={minBookingLenght}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "minBookingLenght")}
          />
        </FormRow>
        <FormRow>
          <FormInput
            label="Maximum nights/booking"
            id="maxBookingLenght"
            type="number"
            defaultValue={maxBookingLenght}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "maxBookingLenght")}
          />
        </FormRow>
        <FormRow>
          <FormInput
            label="Maximum guests/booking"
            id="maxGuestsPerBooking"
            type="number"
            defaultValue={maxGuestsPerBooking}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
          />
        </FormRow>
        <FormRow>
          <FormInput
            label="Breakfast price"
            id="breakfastPrice"
            type="number"
            defaultValue={breakfastPrice}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          />
        </FormRow>
      </Form>
    </div>
  );
}

export default UpdateSettingsForm;
