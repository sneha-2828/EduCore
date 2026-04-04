const User = require("../models/User");
const Subject = require("../models/Subject");
const Unit = require("../models/Unit");
const Note = require("../models/Note");
const Department = require("../models/Department");
console.log("Admin routes loaded");
const bcrypt = require("bcryptjs");

// ===============================
// Get All Users
// ===============================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.error("GET USERS ERROR 👉", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// ===============================
// Update User Role
// ===============================
exports.updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });

    res.status(200).json(user);
  } catch (error) {
    console.error("UPDATE ROLE ERROR 👉", error);
    res.status(500).json({ message: "Failed to update role" });
  }
};

// ===============================
// Delete User
// ===============================
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("DELETE USER ERROR 👉", error);
    res.status(500).json({ message: "Delete failed" });
  }
};

// ===============================
// Admin → Syllabus Status
// ===============================
exports.getSyllabusStatus = async (req, res) => {
  try {
    const departments = await Department.find();

    const result = [];

    for (let dept of departments) {
      const subjects = await Subject.find({
        department: dept._id,
      });

      const subjectData = [];

      for (let subject of subjects) {
        const units = await Unit.find({
          subject: subject._id,
        });

        const totalUnits = units.length;

        let completedUnits = 0;

        for (let unit of units) {
          const note = await Note.findOne({
            unit: unit._id,
          });

          if (note) completedUnits++;
        }

        const percent =
          totalUnits === 0
            ? 0
            : Math.round((completedUnits / totalUnits) * 100);

        subjectData.push({
          name: subject.name,
          code: subject.code,
          completed: completedUnits,
          total: totalUnits,
          percent,
        });
      }

      result.push({
        title: dept.name,
        code: dept.code,
        subjects: subjectData,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("SYLLABUS STATUS ERROR 👉", error);

    res.status(500).json({
      message: "Failed to fetch syllabus status",
    });
  }
};
// ===============================
// Admin Reports
// ===============================
exports.getAdminReports = async (req, res) => {
  try {
    const students = await User.countDocuments({ role: "student" });
    const faculty = await User.countDocuments({ role: "faculty" });

    const totalNotes = await Note.countDocuments();

    // Top viewed notes
    const topNotes = await Note.find()
      .sort({ views: -1 })
      .limit(5)
      .populate("subject", "name");

    // Top subjects by notes
    const subjects = await Subject.find();

    const subjectStats = [];

    for (let subject of subjects) {
      const notes = await Note.countDocuments({
        subject: subject._id,
      });

      subjectStats.push({
        subject: subject.name,
        notes,
      });
    }

    subjectStats.sort((a, b) => b.notes - a.notes);

    res.status(200).json({
      students,
      faculty,
      totalNotes,
      topNotes,
      topSubjects: subjectStats.slice(0, 5),
    });
  } catch (error) {
    console.error("ADMIN REPORT ERROR 👉", error);

    res.status(500).json({
      message: "Failed to fetch reports",
    });
  }
};

// ===============================
// Get Admin Profile
// ===============================
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.user.id).select(
      "name email role createdAt",
    );

    res.status(200).json({
      name: admin.name,
      email: admin.email,
      role: admin.role,
      joined: admin.createdAt,
    });
  } catch (error) {
    console.error("ADMIN PROFILE ERROR 👉", error);

    res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};

// ===============================
// Change Password
// ===============================
exports.changeAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("PASSWORD ERROR 👉", error);

    res.status(500).json({
      message: "Failed to update password",
    });
  }
};

// ===============================
// Get Pending Faculty
// ===============================
exports.getPendingFaculty = async (req, res) => {
  const faculty = await User.find({
    role: "faculty",
    status: "pending",
  });

  res.json(faculty);
};

// ===============================
// Approve Faculty
// ===============================
exports.approveFaculty = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByIdAndUpdate(
    userId,
    { status: "approved" },
    { new: true },
  );

  res.json(user);
};

// ===============================
// Reject Faculty
// ===============================
exports.rejectFaculty = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByIdAndUpdate(
    userId,
    { status: "rejected" },
    { new: true },
  );

  res.json(user);
};
