const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Complaint = require("../models/Complaint");

// GET DASHBOARD STATS
router.get("/stats", auth, async (req, res) => {
  try {
    const total = await Complaint.countDocuments();

    const open = await Complaint.countDocuments({ status: "OPEN" });
    const inProgress = await Complaint.countDocuments({ status: "IN_PROGRESS" });
    const escalated = await Complaint.countDocuments({ status: "ESCALATED" });

    res.json({
      total,
      open,
      inProgress,
      escalated,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;