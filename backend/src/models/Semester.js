const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema({
  semesterNumber: { type: Number, required: true }, // 1 or 2
  year: { type: mongoose.Schema.Types.ObjectId, ref: "Year" },
});

module.exports = mongoose.model("Semester", semesterSchema);
