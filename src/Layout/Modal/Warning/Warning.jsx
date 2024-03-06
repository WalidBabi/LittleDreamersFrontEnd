import React from "react";

const WarningModal = ({ message, onClose }) => {
  return (
    <div className="custom-warning-modal-overlay fixed top-0 left-0 w-full h-full flex items-center justify-center z-10 bg-black bg-opacity-50 transition-opacity">
      <div className="custom-warning-modal w-1/4 bg-amber-300 border-2 rounded-md shadow-md p-4 cursor-default">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
          🚨 Warning 🚨
        </h2>{" "}
        <p className="text-black mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WarningModal;
