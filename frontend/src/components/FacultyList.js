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
    <div>
      <h2>Faculties</h2>
      <ul>
        {faculties.map(fac => (
          <li key={fac._id}>
            <strong>{fac.name}</strong> — {fac.designation}, Email: {fac.email}, Dept: {fac.departmentId?.name || "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
}
