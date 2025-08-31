const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const matchRoutes = require("./routes/matchRoute");
// env config
dotenv.config();

// MongoDB connect
connectDB();

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());


app.use("/api/matches", matchRoutes);


// simple route test
app.get("/", (req, res) => {
  res.send("✅ Cricket Scoring App Backend is running...");
});

// server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
