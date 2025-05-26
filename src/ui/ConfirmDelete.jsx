import Button from "./Button.jsx";

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className="flex w-[400px] flex-col gap-3">
      <h3>Delete {resourceName}</h3>
      <p className="mb-3 text-gray-500">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>
      <div className="flex justify-end gap-3">
        <Button
          disabled={disabled}
          onClick={onCloseModal}
          variation="secondary"
        >
          Cancel
        </Button>
        <Button disabled={disabled} onClick={onConfirm} variation="danger">
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
