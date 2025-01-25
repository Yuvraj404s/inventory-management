// src/App.js
import React from "react";
import InventoryTable from "./components/InventoryTable";
import "./styles.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-5">Inventory Management</h1>
      <InventoryTable />
    </div>
  );
}

export default App;
