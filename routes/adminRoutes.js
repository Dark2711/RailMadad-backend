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



module.exports = router;
