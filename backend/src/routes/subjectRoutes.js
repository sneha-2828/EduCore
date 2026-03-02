const express = require("express");
const router = express.Router();
const {
  createSubject,
  getAllSubjects,
  deleteSubject,
} = require("../controllers/subjectController");

const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");

router.post("/", authMiddleware, roleMiddleware(["admin"]), createSubject);
router.get("/", authMiddleware, getAllSubjects);
router.delete(
  "/:subjectId",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteSubject,
);

module.exports = router;
