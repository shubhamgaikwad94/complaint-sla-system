const cron = require("node-cron");
const mongoose = require("mongoose");
const Complaint = require("../models/Complaint");

// Run every 1 minute
cron.schedule("* * * * *", async () => {

  // If DB not connected → skip
  if (mongoose.connection.readyState !== 1) {
    console.log("⚠️ DB not connected, skipping SLA check");
    return;
  }

  console.log("Checking SLA...");

  try {

    const complaints = await Complaint.find({
      status: { $ne: "RESOLVED" }
    });

    const now = new Date();

    for (let complaint of complaints) {

      const hoursPassed =
        (now - complaint.createdAt) / (1000 * 60 * 60);

      if (
        hoursPassed > complaint.slaHours &&
        complaint.status !== "ESCALATED"
      ) {
        complaint.status = "ESCALATED";
        await complaint.save();

        console.log(`Complaint ${complaint._id} escalated`);
      }
    }

  } catch (error) {
    console.error("SLA ERROR:", error.message);
  }
});