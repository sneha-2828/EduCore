const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  semester: { type: mongoose.Schema.Types.ObjectId, ref: "Semester" },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Subject", subjectSchema);
