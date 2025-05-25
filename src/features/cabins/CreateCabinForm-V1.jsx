import FormRow from "../../ui/FormRow.jsx";
import Button from "../../ui/Button.jsx";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  // hook-form ile inputları kayıt ediyoruz ve event'i karşılıyoruz.
  // useForm'daki defaultValues sayesinde değerleri form'a aktardık.
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  // Tüm hataları nesne olarak yakalıyoruz.
  const { errors } = formState;

  // react query ile kayıt ediyoruz.
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createMutate } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      // kayıt başarılıysa formu sıfırla
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { isPending: isEditing, mutate: editMutate } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      // kayıt başarılıysa formu sıfırla
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const isWorking = isEditing || isCreating;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    // input verilerine data ile erişim sağlıyoruz.
    // mutate içerisine image'ı dahil ediyoruz. image[0] sabit olarak kalacak.
    if (isEditSession)
      editMutate({ newCabinData: { ...data, image }, id: editId });
    else createMutate({ ...data, image });
  }

  function onError(errors) {
    // Burada genel olarak hatalar yakalanıp işlem yapılabilir.
    // Toast message gibi.
    console.log(errors);
    // toast.error("Formda gerekli alanlar doldurulmalıdır.");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="overflow-hidden rounded-md border border-gray-200 bg-white px-10 py-6 text-sm"
    >
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
            required: isEditSession ? false : "This field is" + " required",
          })}
        />
        {errors?.image?.message && (
          <span className="text-sm text-red-700">{errors.image.message}</span>
        )}
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </form>
  );
}

export default CreateCabinForm;
