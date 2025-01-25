// src/components/InventoryTable.js
import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";  // Import Firebase configuration
import AddItemModal from "./AddItemModal";
import EditItemModal from "./EditItemModal";
import DeleteItemModal from "./DeleteItemModal";

function InventoryTable() {
  const [items, setItems] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchItems = async () => {
    const snapshot = await getDocs(collection(db, "inventory"));
    const itemList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setItems(itemList);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (item) => {
    await addDoc(collection(db, "inventory"), item);
    fetchItems();
  };

  const updateItem = async (id, updatedItem) => {
    await updateDoc(doc(db, "inventory", id), updatedItem);
    fetchItems();
  };

  const deleteItemWithConfirmation = async (id) => {
    await deleteDoc(doc(db, "inventory", id));
    fetchItems();
    setDeleteItem(null);
  };

  const filteredItems = items.filter((item) =>
    filterCategory ? item.category.toLowerCase().includes(filterCategory.toLowerCase()) : true
  );

  const sortedItems = [...filteredItems].sort((a, b) =>
    sortOrder === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Filter by category"
          className="border p-2"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => setAddModalOpen(true)}
        >
          Add Item
        </button>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>
              <button
                className="text-blue-500"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              >
                Quantity {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr key={item.id} className={item.quantity < 10 ? "bg-red-100" : ""}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  className="p-1 bg-yellow-500 text-white mr-2"
                  onClick={() => setEditItem(item)}
                >
                  Edit
                </button>
                <button
                  className="p-1 bg-red-500 text-white"
                  onClick={() => setDeleteItem(item)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {addModalOpen && (
        <AddItemModal
          onClose={() => setAddModalOpen(false)}
          onAdd={addItem}
        />
      )}
      {editItem && (
        <EditItemModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onSave={updateItem}
        />
      )}
      {deleteItem && (
        <DeleteItemModal
          itemName={deleteItem.name}
          onClose={() => setDeleteItem(null)}
          onDelete={() => deleteItemWithConfirmation(deleteItem.id)}
        />
      )}
    </div>
  );
}

export default InventoryTable;
