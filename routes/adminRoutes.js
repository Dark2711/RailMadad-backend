// adminRoutes.js
const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const Complaint = require('../models/complaintModel');

// Route to get all complaints
router.get('/complaints', adminMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Error fetching complaints" });
  }
});

// Route to update complaint priority
router.post('/complaints/:id/priority', adminMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (complaint) {
      complaint.priority = req.body.priority;
      await complaint.save();
      res.json({ message: "Priority updated" });
    } else {
      res.status(404).json({ message: "Complaint not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating priority" });
  }
});

module.exports = router;
