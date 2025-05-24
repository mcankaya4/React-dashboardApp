import { useMoveBack } from "../hooks/useMoveBack";

function NotFound() {
  const moveBack = useMoveBack();

  return (
    <main className="flex h-dvh items-center justify-center gap-12 bg-gray-50">
      <div className="flex-shrink basis-[960px] rounded-md border border-gray-100 bg-white p-12 text-center">
        <h1 className="mb-8">
          The page you are looking for could not be found 😢
        </h1>
        <button
          onClick={moveBack}
          className="border px-6 py-3 text-base font-medium"
        >
          &larr; Go back
        </button>
      </div>
    </main>
  );
}

export default NotFound;
