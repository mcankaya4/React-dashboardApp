function Form({ children, onSubmit, type = "default" }) {
  const styles = {
    default: "min-w-[480px] rounded-md bg-white px-10 py-6",
    modal: "min-w-[800px] py-1",
  };
  return (
    <form
      onSubmit={onSubmit}
      className={`overflow-hidden text-sm ${styles[type]}`}
    >
      {children}
    </form>
  );
}

export default Form;
