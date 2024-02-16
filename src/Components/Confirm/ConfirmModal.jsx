import React from "react";
import Modal from "react-modal";
import "./Confirm.css";

Modal.setAppElement("#root");

const ConfirmModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Confirmation Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <p>{`Are you sure you want to delete ${itemName}?`}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="delete-btn">
            Delete
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
