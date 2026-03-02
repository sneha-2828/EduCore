const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    // department: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Department",
    //   required: true,
    // },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    version: {
      type: Number,
      default: 1,
    },

    views: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Note", noteSchema);
