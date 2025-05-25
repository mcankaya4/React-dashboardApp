function Form({ children, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="overflow-hidden rounded-md bg-white px-10 py-6 text-sm"
    >
      {children}
    </form>
  );
}

export default Form;
