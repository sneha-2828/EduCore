const express = require("express");
const router = express.Router();
const { createSemester } = require("../controllers/semesterController");
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");

router.post("/", authMiddleware, roleMiddleware(["admin"]), createSemester);

module.exports = router;
