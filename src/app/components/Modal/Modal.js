import React from "react";

const Modal = ({ isModal, onCloseModal, children }) => {
  if (!isModal) return null;

  return (
    <div className="modal-overlay" onClick={onCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
