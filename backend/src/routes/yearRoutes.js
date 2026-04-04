const express = require("express");
const router = express.Router();

const { createYear } = require("../controllers/yearController");
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");

// Admin creates year
router.post("/", authMiddleware, roleMiddleware(["admin"]), createYear);

module.exports = router;

