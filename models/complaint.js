const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
  },
  pnr: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  subtype: {
    type: String,
    required: true,
  },
  incidentDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  file: {
    type: String, // For storing file paths or URLs
  },
  referenceId: {
    type: String, // To store the generated reference ID
    required: true,
    unique: true, // Ensure that it's unique
  },
});

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
