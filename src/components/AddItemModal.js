// src/components/AddItemModal.js
import React, { useState } from "react";

function AddItemModal({ onClose, onAdd }) {
  const [item, setItem] = useState({ name: "", category: "", quantity: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.name && item.category && item.quantity) {
      onAdd({ ...item, quantity: parseInt(item.quantity, 10) });
      onClose();
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={item.name}
              onChange={(e) => setItem({ ...item, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Category</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={item.category}
              onChange={(e) => setItem({ ...item, category: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Quantity</label>
            <input
              type="number"
              className="border p-2 w-full"
              value={item.quantity}
              onChange={(e) => setItem({ ...item, quantity: e.target.value })}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 p-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemModal;
