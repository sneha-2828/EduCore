const express = require("express");
const router = express.Router();

const { createUnit, getUnits } = require("../controllers/unitController");

const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");

// Create unit (admin only)
router.post("/", authMiddleware, roleMiddleware(["admin"]), createUnit);

// Get units (faculty/student)
router.get("/", authMiddleware, getUnits);

module.exports = router;

