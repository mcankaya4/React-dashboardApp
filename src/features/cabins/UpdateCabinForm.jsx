import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow.jsx";
import Button from "../../ui/Button.jsx";
import { useUpdateCabin } from "./useUpdateCabin.js";
import Form from "../../ui/Form.jsx";

function UpdateCabinForm({ cabin = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabin;

  // hook-form ile inputları kayıt ediyoruz ve event'i karşılıyoruz.
  // useForm'daki defaultValues sayesinde değerleri form'a aktardık.
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editValues,
  });

  // Tüm hataları nesne olarak yakalıyoruz.
  const { errors } = formState;

  // Burada custom hook ile edit işlemini yapıyoruz.
  const { isPending, editMutate } = useUpdateCabin();

  function onSubmit(data) {
    // image verisi var mı diye bakıyoruz yoksa eski image'ı varsa yenisini atıyoruz.
    const image = typeof data.image === "string" ? data.image : data.image[0];
    // input verilerine data ile erişim sağlıyoruz.
    // mutate içerisine image'ı dahil ediyoruz. image[0] sabit olarak kalacak.
    editMutate(
      { newCabinData: { ...data, image }, id: editId },
      // İşlemler başarılıysa yeni verileri yakalamak istiyorsak burada yapabiliriz.
      // aynı zamanda reset'i custom hook'a göndermeyede gerek kalmaz.
      {
        onSuccess: (data) => {
          // istersek yeni verileri data ile yakalarız.
          console.log(data);
          // başarılı olması durumunda istediğimizi burada çalıştırabiliriz.
          reset();
          onCloseModal();
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
    <Form type="modal" onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <label htmlFor="name" className="font-medium">
          Cabin name
        </label>
        <input
          id="name"
          type="text"
          className="rounded-sm border border-gray-300 bg-white px-3 py-2 shadow-sm"
          {...register("name", { required: "This field is required" })}
        />
        {errors?.name?.message && (
          <span className="text-sm text-red-700">{errors.name.message}</span>
        )}
      </FormRow>

      <FormRow>
        <label htmlFor="capacity" className="font-medium">
          Maximum capacity
        </label>
        <input
          id="capacity"
          type="number"
          className="rounded-sm border border-gray-300 bg-white px-3 py-2 shadow-sm"
          {...register("capacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be greater than 1",
            },
          })}
        />
        {errors?.capacity?.message && (
          <span className="text-sm text-red-700">
            {errors.capacity.message}
          </span>
        )}
      </FormRow>

      <FormRow>
        <label htmlFor="regularPrice" className="font-medium">
          Regular price
        </label>
        <input
          id="regularPrice"
          type="number"
          className="rounded-sm border border-gray-300 bg-white px-3 py-2 shadow-sm"
          {...register("regularPrice", { required: "This field is required" })}
        />
        {errors?.regularPrice?.message && (
          <span className="text-sm text-red-700">
            {errors.regularPrice.message}
          </span>
        )}
      </FormRow>

      <FormRow>
        <label htmlFor="discount" className="font-medium">
          Discount
        </label>
        <input
          defaultValue="0"
          id="discount"
          type="number"
          className="rounded-sm border border-gray-300 bg-white px-3 py-2 shadow-sm"
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              if (value > 100) return "indirim 100'den büyük olamaz.";
              if (+value >= +getValues().regularPrice)
                return "regularPrice'den büyük olamaz.";
            },
          })}
        />
        {errors?.discount?.message && (
          <span className="text-sm text-red-700">
            {errors.discount.message}
          </span>
        )}
      </FormRow>

      <FormRow>
        <label htmlFor="description" className="font-medium">
          Description for website
        </label>
        <textarea
          id="description"
          className="h-20 w-full rounded-sm border border-gray-300 bg-white px-3 py-2 shadow-sm"
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors?.description?.message && (
          <span className="text-sm text-red-700">
            {errors.description.message}
          </span>
        )}
      </FormRow>

      <FormRow>
        <label htmlFor="image" className="font-medium">
          Cabin photo
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          className="file-input"
          {...register("image", {
            required: false,
          })}
        />
        {errors?.image?.message && (
          <span className="text-sm text-red-700">{errors.image.message}</span>
        )}
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button disabled={isPending}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateCabinForm;
