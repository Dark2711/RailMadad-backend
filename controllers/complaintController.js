const Complaint = require("../models/complaint.js");

// Function to generate a random 10-digit reference ID
const generateReferenceId = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

const submitComplaint = async (req, res) => {
  const { mobile, pnr, type, subtype, incidentDate, description } = req.body;
  const file = req.file ? req.file.path : null; // Get the file path if a file is uploaded

  // Simple validation
  if (!mobile || !pnr || !type || !subtype || !incidentDate || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Generate a random 10-digit reference ID
    const referenceId = generateReferenceId();

    // Create a new complaint with the reference ID
    const newComplaint = new Complaint({
      mobile,
      pnr,
      type,
      subtype,
      incidentDate,
      description,
      file, // Include file path
      referenceId, // Add the generated reference ID
    });

    await newComplaint.save(); // Save complaint to MongoDB
    res.status(201).json({
      message: "Complaint submitted successfully!",
      referenceId, // Send reference ID back to the frontend
    });
  } catch (error) {
    console.error("Error submitting complaint:", error);
    res.status(500).json({ message: "Error submitting complaint" });
  }
};

// New function to fetch all complaints
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find(); // Fetch all complaints from MongoDB
    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Error fetching complaints" });
  }
};
module.exports = { submitComplaint , getComplaints};
