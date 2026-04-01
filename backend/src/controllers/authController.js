const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===============================
// REGISTER
// ===============================
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Faculty requires approval
    const userStatus = role === "faculty" ? "pending" : "approved";

    let facultyId = undefined;
    if (role === "faculty") {
      let isUnique = false;
      while (!isUnique) {
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        facultyId = `FAC-${randomDigits}`;
        const existing = await User.findOne({ facultyId });
        if (!existing) isUnique = true;
      }
    }

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "student",
      status: userStatus,
      facultyId,
    });

    res.status(201).json({
      message:
        role === "faculty"
          ? "Faculty registration submitted. Wait for admin approval."
          : "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
    });
  }
};

// ===============================
// LOGIN
// ===============================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // 🔴 Check approval status
    if (user.status === "pending") {
      return res.status(403).json({
        message: "Account awaiting admin approval",
      });
    }

    if (user.status === "rejected") {
      return res.status(403).json({
        message: "Your account was rejected by admin",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      name: user.name,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Login failed",
    });
  }
};

// ===============================
// Change Password (Student / Faculty)
// ===============================
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
