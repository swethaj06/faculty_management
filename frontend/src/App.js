// src/App.js
import React, { useState, useEffect } from "react";
import DepartmentForm from "./components/DepartmentForm";
import FacultyForm from "./components/FacultyForm";
import axios from "axios";
import "./App.css";

function App() {
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);

  const [editDepartment, setEditDepartment] = useState(null);
  const [editFaculty, setEditFaculty] = useState(null);

  const fetchDepartments = () => {
    axios.get("http://localhost:5000/api/departments")
      .then(res => setDepartments(res.data))
      .catch(err => console.error("Error fetching departments", err));
  };

  const fetchFaculties = () => {
    axios.get("http://localhost:5000/api/faculties")
      .then(res => setFaculties(res.data))
      .catch(err => console.error("Error fetching faculties", err));
  };

  useEffect(() => {
    fetchDepartments();
    fetchFaculties();
  }, []);

  return (
    <div className="App">
      {/* Header */}
      <div className="app-header">
        <h1>🏫 Faculty Management System</h1>
        <p>Manage your college departments and faculty members efficiently</p>
      </div>

      {/* Department Form Section */}
      <div className="section">
        <div className="content-container">
          <div className="section-header">
            <span className="icon">🏢</span>
            <h2>Department Management</h2>
          </div>
          <DepartmentForm
            departmentToEdit={editDepartment}
            onSave={() => {
              setEditDepartment(null);
              fetchDepartments();
            }}
          />
        </div>
      </div>

      {/* Department List Section */}
      <div className="section">
        <div className="content-container">
          <div className="section-header">
            <span className="icon">📋</span>
            <h2>All Departments</h2>
          </div>
          <div className="item-list">
            {departments.map(dept => (
              <div key={dept._id} className="item-card">
                <h4>{dept.name}</h4>
                <div className="item-details">
                  <p><strong>Head of Department:</strong> {dept.hod}</p>
                  <p><strong>Building:</strong> {dept.building}</p>
                </div>
                <div className="item-actions">
                  <button
                    onClick={() => setEditDepartment(dept)}
                    className="btn btn-secondary"
                  >
                    ✏️ Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Faculty Form Section */}
      <div className="section">
        <div className="content-container">
          <div className="section-header">
            <span className="icon">👥</span>
            <h2>Faculty Management</h2>
          </div>
          <FacultyForm
            facultyToEdit={editFaculty}
            onSave={() => {
              setEditFaculty(null);
              fetchFaculties();
            }}
          />
        </div>
      </div>

      {/* Faculty List Section */}
      <div className="section">
        <div className="content-container">
          <div className="section-header">
            <span className="icon">🎓</span>
            <h2>All Faculty Members</h2>
          </div>
          <div className="item-list">
            {faculties.map(fac => (
              <div key={fac._id} className="item-card">
                <h4>{fac.name}</h4>
                <div className="item-details">
                  <p><strong>Designation:</strong> {fac.designation}</p>
                  <p><strong>Email:</strong> {fac.email}</p>
                  <p><strong>Department:</strong> {fac.departmentId?.name || "N/A"}</p>
                </div>
                <div className="item-actions">
                  <button
                    onClick={() => setEditFaculty(fac)}
                    className="btn btn-secondary"
                  >
                    ✏️ Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
