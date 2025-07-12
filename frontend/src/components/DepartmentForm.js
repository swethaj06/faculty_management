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
    <div className="form-container">
      <h3>{departmentToEdit ? "✏️ Edit" : "➕ Add"} Department</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Department Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter department name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="hod">Head of Department</label>
            <input
              id="hod"
              type="text"
              placeholder="Enter HOD name"
              value={hod}
              onChange={(e) => setHod(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="building">Building</label>
            <input
              id="building"
              type="text"
              placeholder="Enter building name/number"
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              required
            />
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary">
          {departmentToEdit ? "🔄 Update" : "➕ Add"} Department
        </button>
      </form>
    </div>
  );
};

export default DepartmentForm;
