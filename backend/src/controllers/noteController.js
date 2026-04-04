const Note = require("../models/Note");
const Subject = require("../models/Subject");
const Unit = require("../models/Unit");
const User = require("../models/User");
const Question = require("../models/Question");
const mongoose = require("mongoose");
const ExamResult = require("../models/ExamResult");
const StudentActivity = require("../models/StudentActivity");

// ===============================
// Upload Note (Version Control)
// ===============================
exports.uploadNote = async (req, res) => {
  try {
    const { title, subject, unit } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "PDF file required" });
    }

    if (!subject || !unit || !title) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 🔍 Check if note already exists for same faculty + subject + unit
    const existingNote = await Note.findOne({
      subject,
      unit,
      uploadedBy: req.user.id,
    });

    // ===============================
    // If note exists → Update version
    // ===============================
    if (existingNote) {
      existingNote.version += 1;
      existingNote.title = title;
      existingNote.fileUrl = `/uploads/notes/${req.file.filename}`;

      await existingNote.save();

      return res.status(200).json({
        message: "Note updated successfully (new version created)",
        note: existingNote,
      });
    }

    // ===============================
    // If note does not exist → Create new
    // ===============================
    const note = await Note.create({
      title,
      subject,
      unit,
      fileUrl: `/uploads/notes/${req.file.filename}`,
      uploadedBy: req.user.id,
      version: 1,
    });

    res.status(201).json({
      message: "Note uploaded successfully",
      note,
    });
  } catch (error) {
    console.error("UPLOAD ERROR 👉", error);
    res.status(500).json({ message: "Upload failed" });
  }
};

// ===============================
// Get Notes by Subject (Student)
// ===============================
exports.getNotesBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const notes = await Note.find({ subject: subjectId })
      .populate("unit", "title")
      .populate("uploadedBy", "name");

    res.status(200).json(notes);
  } catch (error) {
    console.error("FETCH ERROR 👉", error);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

// ===============================
// Get Single Note (Student View Tracking)
// ===============================
exports.getNoteById = async (req, res) => {
  try {
    const { noteId } = req.params;

    // 🔹 First fetch note
    const note = await Note.findById(noteId)
      .populate("unit", "title")
      .populate("subject", "name")
      .populate("uploadedBy", "name");

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // 🔹 Only increment if student
    if (req.user.role === "student") {
      await Note.updateOne({ _id: noteId }, { $inc: { views: 1 } });

      await StudentActivity.create({
        student: req.user.id,
        subject: note.subject,
        type: "note_view",
        duration: 15, // assume 15 min per note (can improve later)
      });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error("GET NOTE ERROR 👉", error);
    res.status(500).json({ message: "Failed to fetch note" });
  }
};

// ===============================
// Get Faculty Notes
// ===============================
exports.getMyNotes = async (req, res) => {
  try {
    const notes = await Note.find({ uploadedBy: req.user.id })
      .populate("subject", "name")
      .populate("unit", "title");

    res.status(200).json(notes);
  } catch (error) {
    console.error("GET MY NOTES ERROR 👉", error);
    res.status(500).json({ message: "Failed to fetch faculty notes" });
  }
};

// ===============================
// Delete Note
// ===============================
exports.deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findOneAndDelete({
      _id: noteId,
      uploadedBy: req.user.id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR 👉", error);
    res.status(500).json({ message: "Delete failed" });
  }
};
// ===============================
// Syllabus Progress (Faculty)
// ===============================
exports.getSyllabusProgress = async (req, res) => {
  try {
    const subjects = await Subject.find({ faculty: req.user.id });

    const progressData = [];

    for (let subject of subjects) {
      const units = await Unit.find({ subject: subject._id });

      const notes = await Note.find({
        subject: subject._id,
        uploadedBy: req.user.id,
      });

      const completedUnitIds = notes.filter(n => n.unit).map((n) => n.unit.toString());

      const completedUnits = units.filter((u) =>
        completedUnitIds.includes(u._id.toString()),
      );

      const pendingUnits = units.filter(
        (u) => !completedUnitIds.includes(u._id.toString()),
      );

      const completionPercentage =
        units.length === 0
          ? 0
          : Math.round((completedUnits.length / units.length) * 100);

      progressData.push({
        subjectId: subject._id,
        subjectName: subject.name,
        totalUnits: units.length,
        completedUnits: completedUnits.length,
        completionPercentage,
        pendingUnits: pendingUnits.map((u) => u.title),
      });
    }

    res.status(200).json(progressData);
  } catch (error) {
    console.error("SYLLABUS ERROR 👉", error);
    res.status(500).json({ message: "Failed to fetch syllabus progress" });
  }
};

// ===============================
// Faculty Dashboard Overview
// ===============================
exports.getFacultyDashboard = async (req, res) => {
  try {
    const facultyId = req.user.id;
    const facultyUser = await User.findById(facultyId).select("name");

    // 1️⃣ Get subjects assigned to faculty
    const subjects = await Subject.find({
      faculty: facultyId,
    });

    const subjectIds = subjects.map((s) => s._id);

    // 2️⃣ Get all units of those subjects
    const units = await Unit.find({
      subject: { $in: subjectIds },
    });

    // 3️⃣ Get notes uploaded by faculty
    const notes = await Note.find({
      uploadedBy: facultyId,
    })
      .populate("subject", "name")
      .populate("unit", "title");

    // 4️⃣ Get UNIQUE completed unit IDs
    const completedUnitIds = [
      ...new Set(notes.map((note) => note.unit?._id?.toString())),
    ];

    // 5️⃣ Calculate completion %
    const totalUnits = units.length;

    const completionPercentage =
      totalUnits === 0
        ? 0
        : Math.round((completedUnitIds.length / totalUnits) * 100);

    // 6️⃣ Pending units
    const pendingUnits = units
      .filter((unit) => !completedUnitIds.includes(unit._id.toString()))
      .map((unit) => ({
        _id: unit._id,
        title: unit.title,
        subject: {
          name:
            subjects.find((s) => s._id.toString() === unit.subject.toString())
              ?.name || "",
        },
      }));

    // 7️⃣ Recent uploads
    const recentUploads = await Note.find({
      uploadedBy: facultyId,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("subject", "name");

    res.status(200).json({
      facultyName: facultyUser ? facultyUser.name : req.user.name,
      totalSubjects: subjects.length,
      totalNotes: notes.length,
      totalUnits,
      syllabusCompletion: completionPercentage, // ✅ FIXED
      pendingUnits,
      recentUploads,
    });
  } catch (error) {
    console.error("DASHBOARD ERROR 👉", error);
    res.status(500).json({
      message: "Failed to fetch dashboard",
    });
  }
};

// ===============================
// Faculty Analytics
// ===============================
exports.getFacultyAnalytics = async (req, res) => {
  try {
    const facultyId = req.user.id;

    const subjects = await Subject.find({ faculty: facultyId });
    const subjectIds = subjects.map((s) => s._id);

    const units = await Unit.find({
      subject: { $in: subjectIds },
    });

    const notes = await Note.find({
      uploadedBy: facultyId,
    })
      .populate("subject", "name")
      .populate("unit", "title");

    const totalViews = notes.reduce((sum, note) => sum + (note.views || 0), 0);

    const totalNotes = notes.length;
    const totalUnits = units.length;

    const completionPercentage =
      totalUnits === 0 ? 0 : Math.round((totalNotes / totalUnits) * 100);

    // 🔥 Unit-wise views for bar graph
    const unitWiseViews = units.map((unit) => {
      const unitNotes = notes.filter(
        (note) => note.unit?._id.toString() === unit._id.toString(),
      );

      const views = unitNotes.reduce((sum, note) => sum + (note.views || 0), 0);

      return {
        unitTitle: unit.title,
        views,
      };
    });

    res.status(200).json({
      totalNotes,
      totalUnits,
      totalViews,
      completionPercentage,
      notes,
      unitWiseViews, // ✅ IMPORTANT
    });
  } catch (error) {
    console.error("ANALYTICS ERROR 👉", error);
    res.status(500).json({
      message: "Failed to fetch analytics",
    });
  }
};

// ===============================
// Faculty Profile Data
// ===============================
exports.getFacultyProfile = async (req, res) => {
  try {
    const facultyId = req.user.id;

    const faculty = await require("../models/User")
      .findById(facultyId)
      .select("name email role facultyId");

    const subjects = await Subject.find({ faculty: facultyId });

    const notes = await Note.find({ uploadedBy: facultyId });

    // Calculate syllabus completion
    let totalUnits = 0;
    let completedUnits = 0;

    for (let subject of subjects) {
      const units = await Unit.find({ subject: subject._id });
      totalUnits += units.length;

      const notesForSubject = notes.filter(
        (n) => n.subject.toString() === subject._id.toString(),
      );

      const completedUnitIds = notesForSubject.map((n) => n.unit.toString());

      completedUnits += units.filter((u) =>
        completedUnitIds.includes(u._id.toString()),
      ).length;
    }

    const completionPercentage =
      totalUnits === 0 ? 0 : Math.round((completedUnits / totalUnits) * 100);

    res.status(200).json({
      name: faculty.name,
      email: faculty.email,
      role: faculty.role,
      facultyId: faculty.facultyId,
      totalSubjects: subjects.length,
      totalNotes: notes.length,
      syllabusCompletion: completionPercentage,
    });
  } catch (error) {
    console.error("PROFILE ERROR 👉", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};
// ===============================
// Get Subjects for Logged-in Student
// ===============================
exports.getStudentSubjects = async (req, res) => {
  try {
    const studentId = req.user.id;

    const student = await User.findById(studentId);

    if (!student.semester) {
      return res.status(400).json({
        message: "Student semester not assigned",
      });
    }

    // Get subjects of student's semester
    const subjects = await Subject.find({
      semester: student.semester,
    });

    const subjectsData = [];

    for (let subject of subjects) {
      const units = await Unit.find({
        subject: subject._id,
      });

      const notes = await Note.find({
        subject: subject._id,
      });

      subjectsData.push({
        _id: subject._id,
        name: subject.name,
        code: subject.code,
        totalUnits: units.length,
        totalNotes: notes.length,
      });
    }

    res.status(200).json(subjectsData);
  } catch (error) {
    console.error("STUDENT SUBJECT ERROR 👉", error);
    res.status(500).json({
      message: "Failed to fetch subjects",
    });
  }
};

// ===============================
// Student Dashboard Overview
// ===============================

exports.getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    const student = await User.findById(studentId);

    if (!student || !student.semester) {
      return res.status(400).json({
        message: "Student semester not assigned",
      });
    }

    // 1️⃣ Get subjects of student's semester
    const subjects = await Subject.find({
      semester: student.semester,
    });

    const subjectIds = subjects.map((s) => s._id);

    // 2️⃣ Get all units for those subjects
    const units = await Unit.find({
      subject: { $in: subjectIds },
    });

    // 3️⃣ Get all notes available to student
    const notes = await Note.find({
      subject: { $in: subjectIds },
    })
      .populate("subject", "name")
      .populate("unit", "title");

    // 4️⃣ Subject Progress Calculation
    const subjectProgress = subjects.map((subject) => {
      const subjectUnits = units.filter(
        (unit) => unit.subject.toString() === subject._id.toString(),
      );

      const subjectNotes = notes.filter(
        (note) => note.subject._id.toString() === subject._id.toString(),
      );

      // Unique completed unit IDs (units having at least one note)
      const completedUnitIds = [
        ...new Set(subjectNotes.map((note) => note.unit._id.toString())),
      ];

      return {
        subjectId: subject._id,
        subjectName: subject.name,
        totalUnits: subjectUnits.length,
        completedUnits: completedUnitIds.length,
      };
    });

    // 5️⃣ Most active subject (based on notes count)
    const mostActiveSubject =
      subjectProgress.length > 0
        ? subjectProgress.reduce((max, curr) =>
            curr.completedUnits > max.completedUnits ? curr : max,
          )
        : null;

    // 6️⃣ Recent Notes
    const recentNotes = notes
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    res.status(200).json({
      studentName: student.name,
      totalSubjects: subjects.length,
      totalNotes: notes.length,
      mostActiveSubject,
      subjectProgress,
      recentNotes,
    });
  } catch (error) {
    console.error("STUDENT DASHBOARD ERROR 👉", error);
    res.status(500).json({
      message: "Failed to fetch dashboard",
    });
  }
};

// ===============================
// Student Dashboard Overview
// ===============================
exports.getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    const student = await User.findById(studentId);

    if (!student || !student.semester) {
      return res.status(400).json({
        message: "Student semester not assigned",
      });
    }

    // 1️⃣ Get subjects of student's semester
    const subjects = await Subject.find({
      semester: student.semester,
    });

    const subjectIds = subjects.map((s) => s._id);

    // 2️⃣ Get all units for those subjects
    const units = await Unit.find({
      subject: { $in: subjectIds },
    });

    // 3️⃣ Get all notes available to student
    const notes = await Note.find({
      subject: { $in: subjectIds },
    })
      .populate("subject", "name")
      .populate("unit", "title");

    // 4️⃣ Subject Progress Calculation
    const subjectProgress = subjects.map((subject) => {
      const subjectUnits = units.filter(
        (unit) => unit.subject.toString() === subject._id.toString(),
      );

      const subjectNotes = notes.filter(
        (note) => note.subject._id.toString() === subject._id.toString(),
      );

      // Unique completed unit IDs (units having at least one note)
      const completedUnitIds = [
        ...new Set(subjectNotes.map((note) => note.unit._id.toString())),
      ];

      return {
        subjectId: subject._id,
        subjectName: subject.name,
        totalUnits: subjectUnits.length,
        completedUnits: completedUnitIds.length,
      };
    });

    // 5️⃣ Most active subject (based on notes count)
    const mostActiveSubject =
      subjectProgress.length > 0
        ? subjectProgress.reduce((max, curr) =>
            curr.completedUnits > max.completedUnits ? curr : max,
          )
        : null;

    // 6️⃣ Recent Notes
    const recentNotes = notes
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    res.status(200).json({
      studentName: student.name,
      totalSubjects: subjects.length,
      totalNotes: notes.length,
      mostActiveSubject,
      subjectProgress,
      recentNotes,
    });
  } catch (error) {
    console.error("STUDENT DASHBOARD ERROR 👉", error);
    res.status(500).json({
      message: "Failed to fetch dashboard",
    });
  }
};

// ===============================
// Get Single Subject Details (Student)
// ===============================
exports.getStudentSubjectDetails = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Get all units of this subject
    const units = await Unit.find({ subject: subjectId });

    const unitsWithNotes = [];

    for (let unit of units) {
      const notes = await Note.find({
        subject: subjectId,
        unit: unit._id,
      }).populate("uploadedBy", "name");

      unitsWithNotes.push({
        _id: unit._id,
        title: unit.title,
        notes,
      });
    }

    res.status(200).json({
      subjectName: subject.name,
      subjectCode: subject.code,
      totalUnits: units.length,
      units: unitsWithNotes,
    });
  } catch (error) {
    console.error("SUBJECT DETAILS ERROR 👉", error);
    res.status(500).json({
      message: "Failed to fetch subject details",
    });
  }
};

// ===============================
// Get Exam Questions
// ===============================
exports.startExam = async (req, res) => {
  try {
    const { subjectId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
      return res.status(400).json({
        message: "Invalid subject ID",
      });
    }

    const questions = await Question.aggregate([
      {
        $match: {
          subject: new mongoose.Types.ObjectId(subjectId),
        },
      },
      { $sample: { size: 10 } },
    ]);

    if (questions.length === 0) {
      return res.status(404).json({
        message: "No questions found for this subject",
      });
    }

    res.status(200).json({
      totalQuestions: questions.length,
      questions,
    });
  } catch (error) {
    console.error("EXAM ERROR 👉", error);
    res.status(500).json({
      // message: "Failed to start exam",
      message: error.message, // 👈 IMPORTANT CHANGE
    });
  }
};

// ===============================
// Submit Exam
// ===============================
exports.submitExam = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { subjectId, answers } = req.body;

    let score = 0;

    for (let ans of answers) {
      const question = await Question.findById(ans.questionId);

      if (question && question.correctAnswer === ans.selectedAnswer) {
        score++;
      }
    }

    const totalQuestions = answers.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    const result = await ExamResult.create({
      student: studentId,
      subject: subjectId,
      score,
      totalQuestions,
      percentage,
    });

    res.status(200).json({
      message: "Exam submitted successfully",
      score,
      totalQuestions,
      percentage,
      resultId: result._id,
    });
  } catch (error) {
    console.error("SUBMIT EXAM ERROR 👉", error);
    res.status(500).json({
      message: "Failed to submit exam",
    });
  }
};

// ===============================
// Student Analytics
// ===============================
exports.getStudentAnalytics = async (req, res) => {
  try {
    const studentId = req.user.id;

    const results = await ExamResult.find({
      student: studentId,
    }).populate("subject", "name code");

    if (results.length === 0) {
      return res.status(200).json({
        totalExams: 0,
        averageScore: 0,
        bestScore: 0,
        subjectPerformance: [],
        history: [],
      });
    }

    const totalExams = results.length;

    const totalPercentage = results.reduce((sum, r) => sum + r.percentage, 0);

    const averageScore = Math.round(totalPercentage / totalExams);

    const bestScore = Math.max(...results.map((r) => r.percentage));

    // Subject-wise grouping
    const subjectMap = {};

    results.forEach((r) => {
      const subjectName = r.subject.name;

      if (!subjectMap[subjectName]) {
        subjectMap[subjectName] = [];
      }

      subjectMap[subjectName].push(r.percentage);
    });

    const subjectPerformance = Object.keys(subjectMap).map((subject) => {
      const scores = subjectMap[subject];
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

      return {
        subject,
        average: Math.round(avg),
      };
    });

    res.status(200).json({
      totalExams,
      averageScore,
      bestScore,
      subjectPerformance,
      history: results.sort((a, b) => b.createdAt - a.createdAt),
    });
  } catch (error) {
    console.error("STUDENT ANALYTICS ERROR 👉", error);
    res.status(500).json({
      message: "Failed to fetch analytics",
    });
  }
};

exports.getLearningAnalytics = async (req, res) => {
  try {
    const studentId = req.user.id;

    const activities = await StudentActivity.find({
      student: studentId,
    }).populate("subject", "name");

    const exams = await ExamResult.find({
      student: studentId,
    });

    // Total Study Time
    const totalMinutes = activities.reduce(
      (sum, a) => sum + (a.duration || 0),
      0,
    );

    const totalStudyHours = (totalMinutes / 60).toFixed(1);

    // Notes Accessed
    const notesAccessed = activities.filter(
      (a) => a.type === "note_view",
    ).length;

    // Average Completion (based on exams)
    const avgCompletion =
      exams.length === 0
        ? 0
        : Math.round(
            exams.reduce((sum, e) => sum + e.percentage, 0) / exams.length,
          );

    // Weekly Activity
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);

    const weekly = activities.filter((a) => a.createdAt >= weekAgo);

    const weeklyData = {};

    weekly.forEach((a) => {
      const day = a.createdAt.toLocaleDateString("en-US", {
        weekday: "short",
      });

      if (!weeklyData[day]) weeklyData[day] = 0;
      weeklyData[day] += a.duration;
    });

    // Subject-wise Stats
    const subjectStats = {};

    activities.forEach((a) => {
      const subjectName = a.subject?.name;
      if (!subjectName) return;

      if (!subjectStats[subjectName]) {
        subjectStats[subjectName] = {
          time: 0,
          notes: 0,
        };
      }

      subjectStats[subjectName].time += a.duration;

      if (a.type === "note_view") subjectStats[subjectName].notes++;
    });

    res.status(200).json({
      totalStudyHours,
      notesAccessed,
      avgCompletion,
      weeklyData,
      subjectStats,
      recentActivity: activities
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 5),
    });
  } catch (error) {
    console.error("LEARNING ANALYTICS ERROR 👉", error);
    res.status(500).json({
      message: "Failed to fetch analytics",
    });
  }
};

// ===============================
// Student Profile Data
// ===============================
exports.getStudentProfile = async (req, res) => {
  try {
    const studentId = req.user.id;

    const student = await User.findById(studentId)
      .populate("semester", "name")
      .select("name email role semester createdAt");

    const exams = await ExamResult.find({
      student: studentId,
    });

    const activities = await StudentActivity.find({
      student: studentId,
      type: "note_view",
    });

    const totalExams = exams.length;

    const averageScore =
      totalExams === 0
        ? 0
        : Math.round(
            exams.reduce((sum, e) => sum + e.percentage, 0) / totalExams,
          );

    const notesViewed = activities.length;

    res.status(200).json({
      name: student.name,
      email: student.email,
      role: student.role,
      semester: student.semester?.name || "Not Assigned",
      joined: student.createdAt,
      totalExams,
      averageScore,
      notesViewed,
    });
  } catch (error) {
    console.error("STUDENT PROFILE ERROR 👉", error);
    res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findById(userId);

    const bcrypt = require("bcryptjs");

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR 👉", error);
    res.status(500).json({
      message: "Failed to change password",
    });
  }
};
// ===============================
// Admin Dashboard Overview
// ===============================
exports.getAdminDashboard = async (req, res) => {
  try {
    const Department = require("../models/Department");

    const students = await User.countDocuments({ role: "student" });
    const faculty = await User.countDocuments({ role: "faculty" });

    const subjects = await Subject.countDocuments();
    const notes = await Note.countDocuments();
    const departments = await Department.countDocuments();

    // Recent Users
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email role createdAt");

    // Recent Notes
    const recentNotes = await Note.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("subject", "name")
      .populate("uploadedBy", "name");

    res.status(200).json({
      totalStudents: students,
      totalFaculty: faculty,
      totalSubjects: subjects,
      totalNotes: notes,
      totalDepartments: departments,
      recentUsers,
      recentNotes,
    });
  } catch (error) {
    console.error("ADMIN DASHBOARD ERROR 👉", error);
    res.status(500).json({
      message: "Failed to fetch admin dashboard",
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

    const departments = await require("../models/Department").find();

    const departmentData = [];

    for (let dept of departments) {
      const subjects = await Subject.find({
        department: dept._id,
      });

      departmentData.push({
        department: dept.name,
        subjects: subjects.length,
      });
    }

    res.status(200).json({
      students,
      faculty,
      totalNotes,
      departments: departmentData,
    });
  } catch (error) {
    console.error("ADMIN REPORT ERROR 👉", error);

    res.status(500).json({
      message: "Failed to generate report",
    });
  }
};
