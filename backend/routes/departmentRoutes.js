const express = require("express");
const router = express.Router();
const Department = require("../models/Department");

// Get all departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new department
router.post("/", async (req, res) => {
  console.log("📩 Received department data:", req.body);
  try {
    const department = new Department(req.body);
    const saved = await department.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error saving department:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Update department
router.put("/:id", async (req, res) => {
  try {
    const updated = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;