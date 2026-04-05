const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    

    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
      default: "student",
    },

    facultyId: {
      type: String,
      sparse: true,
      unique: true,
    },

    // 🔥 ADD THIS
    semester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
