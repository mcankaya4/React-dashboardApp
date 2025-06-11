function FormRowVertical({ label, error, children, id }) {
  return (
    <div className="flex flex-col gap-2 py-3">
      {label && (
        <label className="font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-sm text-red-700">{error}</span>}
    </div>
  );
}

export default FormRowVertical;
