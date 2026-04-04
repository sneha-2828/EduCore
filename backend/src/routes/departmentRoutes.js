const express = require("express");
console.log("loading departmentRoutes");

const router = express.Router();

const {
  createDepartment,
  getDepartments,
  deleteDepartment,
} = require("../controllers/departmentController");

const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");

console.log("departmentRoutes handlers:", {
  createDepartment: !!createDepartment,
  getDepartments: !!getDepartments,
  deleteDepartment: !!deleteDepartment,
});

// ===============================
// Create Department (Admin)
// ===============================
router.post("/", authMiddleware, roleMiddleware(["admin"]), createDepartment);

// ===============================
// Get Departments
// ===============================
router.get("/", authMiddleware, getDepartments);

// ===============================
// Delete Department (Admin)
// ===============================
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteDepartment,
);

console.log("exporting departmentRoutes");

module.exports = router;
