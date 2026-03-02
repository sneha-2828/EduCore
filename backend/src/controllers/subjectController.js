const Subject = require("../models/Subject");

exports.createSubject = async (req, res) => {
  const sub = await Subject.create(req.body);
  res.json(sub);
};

// Get subjects for students
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate("semester")
      .populate("faculty", "name");

    res.status(200).json(subjects);
  } catch (error) {
    console.error("GET SUBJECTS ERROR 👉", error);
    res.status(500).json({ message: "Failed to fetch subjects" });
  }
};

// Delete subject
exports.deleteSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const subject = await Subject.findByIdAndDelete(subjectId);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error("DELETE SUBJECT ERROR 👉", error);
    res.status(500).json({ message: "Failed to delete subject" });
  }
};
