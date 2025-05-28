function Select({ options, value, onChange }) {
  return (
    <select
      className="rounded-sm border-none bg-white px-3 py-2 text-sm font-semibold shadow-sm"
      value={value}
      onChange={onChange}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
