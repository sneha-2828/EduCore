const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
});

module.exports = mongoose.model("Unit", unitSchema);
