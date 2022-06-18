import React from "react";
import { createPortal } from "react-dom";

import "./Modal.css";

import useKeyDown from "../../Hooks/useKeyDown";

const Modal = ({ children, setIsModalOpen }) => {
  useKeyDown(() => {
    setIsModalOpen(false);
  }, "Escape");
  useKeyDown(() => {
    setIsModalOpen(true);
  }, "q");

  return createPortal(
    <div className="modal-container"> {children} </div>,
    document.getElementById("modal")
  );
};

export default Modal;
