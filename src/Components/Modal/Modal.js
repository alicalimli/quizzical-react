import React from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

const Modal = ({ children, setIsModalOpen }) => {
  window.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    setIsModalOpen(false);
    console.log(e);
  });

  return createPortal(
    <div aria-hidden className="modal-container">
      {" "}
      {children}{" "}
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
