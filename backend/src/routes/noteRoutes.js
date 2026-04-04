const express = require("express");
const router = express.Router();



const {
  uploadNote,
  getNotesBySubject,
  getNoteById,
  getMyNotes,
  deleteNote,
  getFacultyDashboard,
  getFacultyProfile,
  getSyllabusProgress,
  getFacultyAnalytics,
  getStudentSubjects,
  getStudentDashboard,
  getStudentSubjectDetails,
  startExam,
  submitExam,
  getStudentAnalytics,
  getLearningAnalytics,
  getStudentProfile,
  changePassword,
  getAdminDashboard,
  getAdminReports,
} = require("../controllers/noteController");

const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

/* ============================================================
   ====================== FACULTY ROUTES ======================
   ============================================================ */

// Upload Note
router.post(
  "/upload",
  authMiddleware,
  roleMiddleware(["faculty"]),
  upload.single("file"),
  uploadNote,
);

// Faculty Dashboard
router.get(
  "/faculty-dashboard",
  authMiddleware,
  roleMiddleware(["faculty"]),
  getFacultyDashboard,
);

// Faculty Analytics
router.get(
  "/analytics",
  authMiddleware,
  roleMiddleware(["faculty"]),
  getFacultyAnalytics,
);

// Faculty Profile
router.get(
  "/faculty-profile",
  authMiddleware,
  roleMiddleware(["faculty"]),
  getFacultyProfile,
);

// Faculty Syllabus Progress
router.get(
  "/syllabus-progress",
  authMiddleware,
  roleMiddleware(["faculty"]),
  getSyllabusProgress,
);

// Faculty Notes
router.get(
  "/my-notes",
  authMiddleware,
  roleMiddleware(["faculty"]),
  getMyNotes,
);

// Delete Note
router.delete(
  "/:noteId",
  authMiddleware,
  roleMiddleware(["faculty"]),
  deleteNote,
);

/* ============================================================
   ====================== STUDENT ROUTES ======================
   ============================================================ */

// Student Dashboard
router.get(
  "/student/dashboard",
  authMiddleware,
  roleMiddleware(["student"]),
  getStudentDashboard,
);

// Student Subjects
router.get(
  "/student/subjects",
  authMiddleware,
  roleMiddleware(["student"]),
  getStudentSubjects,
);

// Student Subject Details (Units + Notes)
router.get(
  "/student/subject/:subjectId",
  authMiddleware,
  roleMiddleware(["student"]),
  getStudentSubjectDetails,
);

// Student Exam
router.get(
  "/student/exam/:subjectId",
  authMiddleware,
  roleMiddleware(["student"]),
  startExam,
);

router.post(
  "/student/exam/submit",
  authMiddleware,
  roleMiddleware(["student"]),
  submitExam,
);

router.get(
  "/student/analytics",
  authMiddleware,
  roleMiddleware(["student"]),
  getStudentAnalytics,
);

router.get(
  "/student/learning-analytics",
  authMiddleware,
  roleMiddleware(["student"]),
  getLearningAnalytics,
);

router.get(
  "/student/profile",
  authMiddleware,
  roleMiddleware(["student"]),
  getStudentProfile,
);

// ===============================
// Admin Dashboard
// ===============================
router.get(
  "/admin/dashboard",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAdminDashboard,
);

router.get(
  "/admin/reports",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAdminReports,
);

// ===============================
// Change Password (Student / Faculty)
// ===============================
router.put("/change-password", authMiddleware, changePassword);

/* ============================================================
   =================== COMMON ROUTES ==========================
   ============================================================ */

// Get Notes by Subject (Used by student & faculty)
router.get("/subject/:subjectId", authMiddleware, getNotesBySubject);

// ⚠ VERY IMPORTANT: Keep this LAST
router.get("/:noteId", authMiddleware, getNoteById);

module.exports = router;
