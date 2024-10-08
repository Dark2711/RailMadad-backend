// routes/complaintRoutes.js
const express = require('express');
// const { submitComplaint } = require('../controllers/complaintController.js');
const upload = require('../config/multerConfig'); // Import multer configuration
const router = express.Router();
const { submitComplaint, getComplaints } = require('../controllers/complaintController');
// POST route for submitting complaints
router.post('/submit', upload.single('file'), submitComplaint); // 'file' should match the name in the form field
router.get('/complaints', getComplaints);
module.exports = router;
