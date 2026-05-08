const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      default: "LOW",
    },

    slaHours: { type: Number },

    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "ESCALATED", "RESOLVED"],
      default: "OPEN",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);