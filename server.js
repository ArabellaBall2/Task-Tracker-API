const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const PORT = process.env.PORT;



require("./config/db");

const app = express();
app.use(bodyParser.json());



app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    message: "Task Tracker API is running",
  });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
