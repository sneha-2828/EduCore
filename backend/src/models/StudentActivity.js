const mongoose = require("mongoose");

const studentActivitySchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    type: {
      type: String,
      enum: ["note_view", "exam_start", "exam_submit"],
    },
    duration: {
      type: Number, // in minutes
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("StudentActivity", studentActivitySchema);
