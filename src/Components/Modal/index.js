import React from "react";
import { createPortal } from "react-dom";
import useKeyDown from "../../Hooks/useKeyDown";
import "./Modal.css";

const Modal = ({ children, setIsModalOpen }) => {
  /*  Convert KeyDown Listener into Reusable Hook named /hooks/useKeyDown */
  useKeyDown(setIsModalOpen.bind(null, false));
  /** Another callback way of passing callback function as arguments
   *  useKeyDown(setIsModalOpen.bind(null, false)) is equivalent to:
   *  useKeyDown(()=> setIsModalOpen(false))
   * */

  return createPortal(
    <div className="modal-container">{children}</div>,
    document.getElementById("modal")
  );
};

export default Modal;
