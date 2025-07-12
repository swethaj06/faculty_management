import React, { useState, useEffect } from "react";
import axios from "axios";

const DepartmentForm = ({ departmentToEdit, onSave }) => {
  const [name, setName] = useState("");
  const [hod, setHod] = useState("");
  const [building, setBuilding] = useState("");

  useEffect(() => {
    if (departmentToEdit) {
      setName(departmentToEdit.name || "");
      setHod(departmentToEdit.hod || "");
      setBuilding(departmentToEdit.building || "");
    }
  }, [departmentToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, hod, building };

    try {
      if (departmentToEdit) {
        await axios.put(`http://localhost:5000/api/departments/${departmentToEdit._id}`, payload);
      } else {
        await axios.post("http://localhost:5000/api/departments", payload);
      }

      onSave();
      setName("");
      setHod("");
      setBuilding("");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("❌ Failed to save department.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{departmentToEdit ? "Edit" : "Add"} Department</h3>
      <input
        type="text"
        placeholder="Department Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      /><br />
      <input
        type="text"
        placeholder="Head of Department"
        value={hod}
        onChange={(e) => setHod(e.target.value)}
        required
      /><br />
      <input
        type="text"
        placeholder="Building"
        value={building}
        onChange={(e) => setBuilding(e.target.value)}
        required
      /><br />
      <button type="submit">{departmentToEdit ? "Update" : "Add"} Department</button>
    </form>
  );
};

export default DepartmentForm;
