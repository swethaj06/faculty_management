// src/components/FacultyList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FacultyList() {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/faculties").then(res => {
      setFaculties(res.data);
    }).catch(err => {
      console.error("Error loading faculties", err);
    });
  }, []);

  return (
    <div className="item-list">
      {faculties.length === 0 ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        faculties.map((fac) => (
          <div key={fac._id} className="item-card">
            <h4>👨‍🏫 {fac.name}</h4>
            <div className="item-details">
              <p><strong>Designation:</strong> <span className="badge badge-success">{fac.designation}</span></p>
              <p><strong>Email:</strong> {fac.email}</p>
              <p><strong>Department:</strong> {fac.departmentId?.name || "N/A"}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
