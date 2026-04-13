const express = require("express");
const router = express.Router();
console.log("Admin routes loaded");
const {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getSyllabusStatus,
  getAdminReports,
  generateReport,
  getAdminProfile,
  changeAdminPassword,
  getPendingFaculty,
  approveFaculty,
  rejectFaculty,
} = require("../controllers/adminController");

const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");

// Get all users
router.get("/users", authMiddleware, roleMiddleware(["admin"]), getAllUsers);

// Update role
router.put(
  "/users/:userId/role",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateUserRole,
);

// Delete user
router.delete(
  "/users/:userId",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteUser,
);

// SYLLABUS STATUS
router.get(
  "/syllabus-status",
  authMiddleware,
  roleMiddleware(["admin"]),
  getSyllabusStatus,
);
router.get(
  "/reports",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAdminReports,
);

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAdminProfile,
);

router.put(
  "/change-password",
  authMiddleware,
  roleMiddleware(["admin"]),
  changeAdminPassword,
);

router.get(
  "/pending-faculty",
  authMiddleware,
  roleMiddleware(["admin"]),
  getPendingFaculty,
);

router.put(
  "/approve/:userId",
  authMiddleware,
  roleMiddleware(["admin"]),
  approveFaculty,
);

router.put(
  "/reject/:userId",
  authMiddleware,
  roleMiddleware(["admin"]),
  rejectFaculty,
);

module.exports = router;
