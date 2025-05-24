function FormRow({ children }) {
  return (
    <div className="form-row grid grid-cols-[240px_1fr_1.2fr] items-center gap-6 py-3 not-last:border-b not-last:border-b-gray-100 first:pt-0 last:pb-0">
      {children}
    </div>
  );
}

export default FormRow;
