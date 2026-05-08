const express = require("express");
const Complaint = require("../models/Complaint");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

/* ============================
   CREATE COMPLAINT (USER)
============================ */
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    let slaHours;

    switch (priority) {
      case "CRITICAL":
        slaHours = 1;
        break;
      case "HIGH":
        slaHours = 4;
        break;
      case "MEDIUM":
        slaHours = 12;
        break;
      default:
        slaHours = 24;
    }

    const complaint = await Complaint.create({
      title,
      description,
      priority,
      slaHours,
      createdBy: req.user.userId,
    });

    res.status(201).json(complaint);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/* ============================
   GET COMPLAINTS (ROLE BASED)
============================ */
router.get("/", auth, async (req, res) => {
  try {
    let complaints;

    if (req.user.role === "admin") {
      complaints = await Complaint.find()
        .populate("createdBy", "name")
        .populate("assignedTo", "name")
        .sort({ createdAt: -1 });
    }

    else if (req.user.role === "agent") {
      complaints = await Complaint.find({
        assignedTo: req.user.userId,
      })
        .populate("createdBy", "name")
        .populate("assignedTo", "name")
        .sort({ createdAt: -1 });
    }

    else {
      complaints = await Complaint.find({
        createdBy: req.user.userId,
      })
        .populate("createdBy", "name")
        .populate("assignedTo", "name")
        .sort({ createdAt: -1 });
    }

    res.json(complaints);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ============================
   ASSIGN COMPLAINT (ADMIN)
============================ */
router.put("/:id/assign", auth, role(["admin"]), async (req, res) => {
  try {
    const { agentId } = req.body;

    if (!agentId) {
      return res.status(400).json({ message: "Agent ID required" });
    }

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.assignedTo = agentId;
    complaint.status = "IN_PROGRESS";

    await complaint.save();

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ============================
   RESOLVE (AGENT + ADMIN)
============================ */
router.put("/:id/status", auth, role(["agent", "admin"]), async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Agent can resolve only assigned complaint
    if (
      req.user.role === "agent" &&
      complaint.assignedTo?.toString() !== req.user.userId
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    complaint.status = "RESOLVED";

    await complaint.save();

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;