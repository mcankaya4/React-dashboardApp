function FormInput({
  label,
  id,
  type = "text",
  register,
  validation,
  error,
  defaultValue = "",
  ...rest // onBlur, disabled vs.
}) {
  const inputProps = register ? register(id, validation) : {};

  return (
    <>
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        defaultValue={defaultValue}
        className="rounded-sm border border-gray-300 bg-white px-3 py-2 shadow-sm"
        {...inputProps}
        {...rest}
      />
      {error && <span className="text-sm text-red-700">{error.message}</span>}
    </>
  );
}

export default FormInput;
