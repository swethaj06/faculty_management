import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FacultyForm({ facultyToEdit, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    email: "",
    departmentId: ""
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/departments")
      .then(res => setDepartments(res.data));

    if (facultyToEdit) {
      setFormData({
        name: facultyToEdit.name || "",
        designation: facultyToEdit.designation || "",
        email: facultyToEdit.email || "",
        departmentId: facultyToEdit.departmentId?._id || facultyToEdit.departmentId || ""
      });
    }
  }, [facultyToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, designation, email, departmentId } = formData;

    if (!name || !designation || !email || !departmentId) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (facultyToEdit?._id) {
        await axios.put(`http://localhost:5000/api/faculties/${facultyToEdit._id}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/faculties", formData);
      }

      setFormData({ name: "", designation: "", email: "", departmentId: "" });
      onSave();
    } catch (err) {
      console.error("❌ Error saving faculty:", err.response?.data || err.message);
      alert("Error saving faculty");
    }
  };

  return (
    <div className="form-container">
      <h3>{facultyToEdit ? "✏️ Edit" : "➕ Add"} Faculty</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Faculty Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter faculty name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="designation">Designation</label>
            <input
              id="designation"
              type="text"
              name="designation"
              placeholder="e.g., Professor, Assistant Professor"
              value={formData.designation}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="departmentId">Department</label>
            <select
              id="departmentId"
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Department --</option>
              {departments.map(dep => (
                <option key={dep._id} value={dep._id}>
                  {dep.name} ({dep.building})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {facultyToEdit ? "🔄 Update" : "➕ Create"} Faculty
        </button>
      </form>
    </div>
  );
}
