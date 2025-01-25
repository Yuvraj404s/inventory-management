// src/components/DeleteItemModal.js
import React from "react";

function DeleteItemModal({ itemName, onClose, onDelete }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Delete Item</h2>
        <p className="mb-4">
          Are you sure you want to delete the item <strong>{itemName}</strong>?
        </p>
        <div className="flex justify-end">
          <button
            type="button"
            className="mr-2 p-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="p-2 bg-red-500 text-white rounded"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteItemModal;
