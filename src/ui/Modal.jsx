import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick.js";

// Context modal'ı çalıştırıyoruz.
const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  function handleClose() {
    setOpenName("");
  }

  function handleOpen(opens) {
    setOpenName(opens);
  }

  return (
    // Context'leri tanımlıyoruz ve alt elementlere aktarıyoruz.
    // openName modal açma kapatmasını gözleyen state
    // handleClose kapatma // handleOpen açma işlemi
    <ModalContext.Provider value={{ openName, handleClose, handleOpen }}>
      <div>{children}</div>
    </ModalContext.Provider>
  );
}

// Bu modalı açan butonu içerden yönetebilmemizi sağlayan component.
function Open({ children, opens }) {
  const { handleOpen } = useContext(ModalContext);
  // return children;
  // Normalde return children olan dış component'e tıklama olayı verebilmek için klonluyoruz.
  // Klon sayesinde onClick çalıştırabiliyoruz.
  return cloneElement(children, {
    onClick: () => {
      handleOpen(opens);
    },
  });
}

// Bu modal için görüntülenecek pencere componenti.
// Buraya form gönderirsek modalda form açar.
// Buraya tablo gönderirsek tablo açar.
function Window({ children, name }) {
  const { openName, handleClose } = useContext(ModalContext);

  // Buraya overlay sağ tıklama custom hook
  const { window } = useOutsideClick(handleClose);

  // openName boş ise modal açma dolu ise ismi uyan modalı aç.
  if (name !== openName) return null;

  // Createportal ile elementi dom ağacında body'nin içerisine en üst element olarak taşıyoruz.
  return createPortal(
    <div className="fixed top-0 left-0 z-50 h-dvh w-full bg-white/10 backdrop-blur-xs duration-500">
      <div
        className="fixed top-1/2 left-1/2 -translate-1/2 rounded-lg bg-white px-10 py-8 shadow-lg duration-500"
        ref={window}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-5 translate-x-2 rounded-sm p-1 duration-200 hover:bg-gray-100"
        >
          <HiXMark className="h-6 w-6 text-gray-500" />
        </button>
        {/*Gelen children elementi klon yapıp, props veriyoruz. */}
        {/*Children'da onClick vermek için bunu yapmamız şart.*/}
        {cloneElement(children, {
          onCloseModal: handleClose,
        })}
      </div>
    </div>,
    document.body,
  );
}

// Modal içi açma butonu olan open ve modal pencerelerini child olarak ayarlıyoruz.
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
