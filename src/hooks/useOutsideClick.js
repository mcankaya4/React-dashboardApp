import { useEffect, useRef } from "react";

export function useOutsideClick(handleClose, listenCapturing = true) {
  // Modalı kapatmak için ref window'u ref'liyoruz.
  // Amacımız window haric tıklama yakalarsak modalı kapatmak.
  const window = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      // window harici tıklama kontrolü ve işlemi
      if (window.current && !window.current.contains(e.target)) handleClose();
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handleClose, listenCapturing]);

  return { window };
}
