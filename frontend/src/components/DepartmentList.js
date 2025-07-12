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
    <div className="item-list">
      {departments.length === 0 ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        departments.map((dept) => (
          <div key={dept._id} className="item-card">
            <h4>🏢 {dept.name}</h4>
            <div className="item-details">
              <p><strong>Head of Department:</strong> {dept.hod}</p>
              <p><strong>Building:</strong> <span className="badge badge-info">{dept.building}</span></p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
