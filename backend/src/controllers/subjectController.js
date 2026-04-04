const Subject = require("../models/Subject");
const User = require("../models/User");

exports.createSubject = async (req, res) => {
  try {
    const payload = { ...req.body };
    
    if (req.body.facultyId) {
      const faculty = await User.findOne({ facultyId: req.body.facultyId, role: { $in: ["faculty", "admin"] } });
      if (!faculty) {
        return res.status(404).json({ message: "Invalid Faculty ID provided" });
      }
      payload.faculty = faculty._id;
    }

    const sub = await Subject.create(payload);
    res.status(201).json(sub);
  } catch (error) {
    console.error("CREATE SUBJECT ERROR 👉", error);
    res.status(500).json({ message: "Failed to create subject" });
  }
};

// Get subjects for students
exports.getAllSubjects = async (req, res) => {
  try {
    const { department } = req.query;
    const filter = department ? { department } : {};
    
    const subjects = await Subject.find(filter)
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
