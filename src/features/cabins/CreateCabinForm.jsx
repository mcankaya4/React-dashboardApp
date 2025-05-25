import FormRow from "../../ui/FormRow.jsx";
import Button from "../../ui/Button.jsx";
import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin.js";
import FormInput from "../../ui/FormInput.jsx";
import FormTextarea from "../../ui/FormTextarea.jsx";
import FormFileInput from "../../ui/FormFileInput.jsx";
import Form from "../../ui/Form.jsx";

function CreateCabinForm() {
  // hook-form ile inputları kayıt ediyoruz ve event'i karşılıyoruz.
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  // Tüm hataları nesne olarak yakalıyoruz.
  const { errors } = formState;

  // Cabin create için oluşturduğumuz custom hook.
  const { isPending, mutate } = useCreateCabin();

  function onSubmit(data) {
    console.log(data);
    // input verilerine data ile erişim sağlıyoruz.
    // mutate içerisine image'ı dahil ediyoruz. image[0] sabit olarak kalacak.
    mutate(
      { ...data, image: data.image[0] },
      {
        onSuccess: (data) => {
          console.log(data);
          reset();
        },
      },
    );
  }

  function onError(errors) {
    // Burada genel olarak hatalar yakalanıp işlem yapılabilir.
    // Toast message gibi.
    console.log(errors);
    // toast.error("Formda gerekli alanlar doldurulmalıdır.");
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="overflow-hidden rounded-md border border-gray-200 bg-white px-10 py-6 text-sm"
    >
      <FormRow>
        <FormInput
          label="Cabin name"
          id="name"
          type="text"
          register={register}
          validation={{ required: "This field is required" }}
          error={errors?.name}
        />
      </FormRow>

      <FormRow>
        <FormInput
          label="Maximum capacity"
          id="capacity"
          type="number"
          register={register}
          validation={{
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be greater than 1",
            },
          }}
          error={errors?.capacity}
        />
      </FormRow>

      <FormRow>
        <FormInput
          label="Regular price"
          id="regularPrice"
          type="number"
          register={register}
          validation={{ required: "This field is required" }}
          error={errors?.regularPrice}
        />
      </FormRow>

      <FormRow>
        <FormInput
          label="Discount"
          id="discount"
          type="number"
          register={register}
          validation={{
            required: "This field is required",
            validate: (value) => {
              if (value > 100) return "indirim 100'den büyük olamaz.";
              if (+value >= +getValues().regularPrice)
                return "regularPrice'den büyük olamaz.";
            },
          }}
          error={errors?.discount}
        />
      </FormRow>

      <FormRow>
        <FormTextarea
          label="Description for website"
          id="description"
          register={register}
          validation={{ required: "This field is required" }}
          error={errors?.description}
        />
      </FormRow>

      <FormRow>
        <FormFileInput
          label="Cabin photo"
          id="image"
          accept="image/*"
          register={register}
          validation={{ required: "This field is required" }}
          error={errors?.image}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
