function FormTextarea({ label, id, register, error, validation }) {
  return (
    <>
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <textarea
        id={id}
        className="h-20 w-full rounded-sm border border-gray-300 bg-white px-3 py-2 shadow-sm"
        {...register(id, validation)}
      ></textarea>
      {error && <span className="text-sm text-red-700">{error.message}</span>}
    </>
  );
}

export default FormTextarea;
