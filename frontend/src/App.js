// src/App.js
import React, { useState, useEffect } from "react";
import DepartmentList from "./components/DepartmentList";
import DepartmentForm from "./components/DepartmentForm";
import FacultyList from "./components/FacultyList";
import FacultyForm from "./components/FacultyForm";
import axios from "axios";

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
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>College Department & Faculty Management</h1>

      {/* Department Form Section */}
      <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px" }}>
        <DepartmentForm
          departmentToEdit={editDepartment}
          onSave={() => {
            setEditDepartment(null);
            fetchDepartments();
          }}
        />
      </div>

      {/* Department List Section */}
      <div style={{ marginBottom: "40px" }}>
        <h2>Departments</h2>
        <ul>
          {departments.map(dept => (
            <li key={dept._id}>
              {dept.name} (HOD: {dept.hod}, Building: {dept.building})
              <button
                onClick={() => setEditDepartment(dept)}
                style={{ marginLeft: "10px" }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Faculty Form Section */}
      <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px" }}>
        <FacultyForm
          facultyToEdit={editFaculty}
          onSave={() => {
            setEditFaculty(null);
            fetchFaculties();
          }}
        />
      </div>

      {/* Faculty List Section */}
      <div>
        <h2>Faculties</h2>
        <ul>
          {faculties.map(fac => (
            <li key={fac._id}>
              {fac.name} - {fac.designation} - {fac.email} - Dept: {fac.departmentId?.name || "N/A"}
              <button
                onClick={() => setEditFaculty(fac)}
                style={{ marginLeft: "10px" }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
