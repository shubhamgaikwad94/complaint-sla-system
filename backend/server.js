const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());

app.use(express.json());

/* =========================
   ROUTES
========================= */
app.use("/api/auth", require("./routes/auth"));

app.use("/api/complaints", require("./routes/complaint"));

app.use("/api/dashboard", require("./routes/dashboard"));

/* USER ROUTE */
app.use("/api/users", require("./routes/user"));

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("Complaint SLA Backend Running");
});

/* =========================
   DATABASE
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });