const express = require("express");
console.log("loading departmentRoutes");
const router = express.Router();
const {
  createDepartment,
  getDepartments,
} = require("../controllers/departmentController");
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");

console.log("departmentRoutes handlers:", {
  createDepartment: !!createDepartment,
  getDepartments: !!getDepartments,
});

router.post("/", authMiddleware, roleMiddleware(["admin"]), createDepartment);
router.get("/", authMiddleware, getDepartments);

console.log("exporting departmentRoutes");
module.exports = router;
