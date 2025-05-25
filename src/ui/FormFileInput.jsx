function FormFileInput({ label, id, register, error, validation, accept }) {
  return (
    <>
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <input
        type="file"
        id={id}
        accept={accept}
        className="file-input"
        {...register(id, validation)}
      />
      {error && <span className="text-sm text-red-700">{error.message}</span>}
    </>
  );
}

export default FormFileInput;
