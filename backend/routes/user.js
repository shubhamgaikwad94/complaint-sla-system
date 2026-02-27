const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

// ADMIN → GET ALL AGENTS
router.get("/agents", auth, role(["admin"]), async (req, res) => {
  const agents = await User.find({ role: "agent" }).select("_id name email");
  res.json(agents);
});

module.exports = router;