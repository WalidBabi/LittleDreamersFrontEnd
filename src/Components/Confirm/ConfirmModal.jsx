// CustomModal.js
import React from "react";
import Modal from "react-modal";
import "./Confirm.css";

Modal.setAppElement("#root");

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Custom Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-btn">
            Confirm
          </button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
