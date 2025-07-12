// src/components/DepartmentList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/departments")
      .then(res => setDepartments(res.data))
      .catch(err => console.error("Error fetching departments:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Departments</h2>
      <ul>
        {departments.map((dept) => (
          <li key={dept._id}>
            <strong>{dept.name}</strong> — HOD: {dept.hod}, Building: {dept.building}
          </li>
        ))}
      </ul>
    </div>
  );
}
