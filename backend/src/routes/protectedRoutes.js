const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");

router.get(
  "/student",
  authMiddleware,
  roleMiddleware(["student"]),
  (req, res) => {
    res.json({ message: "Student access granted" });
  },
);

router.get(
  "/faculty",
  authMiddleware,
  roleMiddleware(["faculty"]),
  (req, res) => {
    res.json({ message: "Faculty access granted" });
  },
);

router.get("/admin", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
  res.json({ message: "Admin access granted" });
});

module.exports = router;
