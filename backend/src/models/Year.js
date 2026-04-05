const mongoose = require("mongoose");

const yearSchema = new mongoose.Schema({
  yearNumber: { type: Number, required: true }, // 1,2,3,4
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
});

module.exports = mongoose.model("Year", yearSchema);

