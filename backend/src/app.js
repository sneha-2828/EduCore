const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

const departmentRoutes = require("./routes/departmentRoutes");
const yearRoutes = require("./routes/yearRoutes");
const semesterRoutes = require("./routes/semesterRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const unitRoutes = require("./routes/unitRoutes");
const noteRoutes = require("./routes/noteRoutes");
// const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploads as static files
// app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);

app.use("/api/departments", departmentRoutes);
app.use("/api/years", yearRoutes);
app.use("/api/semesters", semesterRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/notes", noteRoutes);
app.use("/uploads", express.static("uploads"));
// app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working");
});

module.exports = app;
