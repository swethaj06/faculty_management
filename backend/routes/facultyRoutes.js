const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");

// Get all faculties
router.get("/", async (req, res) => {
  try {
    const faculties = await Faculty.find().populate("departmentId");
    res.json(faculties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new faculty
router.post("/", async (req, res) => {
  console.log("📩 Received faculty data:", req.body);
  try {
    const faculty = new Faculty(req.body);
    const saved = await faculty.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error saving faculty:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Update faculty
router.put("/:id", async (req, res) => {
  try {
    const updated = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
