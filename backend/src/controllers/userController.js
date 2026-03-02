// const User = require("../models/User");
// const bcrypt = require("bcryptjs");

// // Admin creates faculty
// exports.createFaculty = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const faculty = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: "faculty",
//     });

//     res.status(201).json({
//       message: "Faculty created successfully",
//       faculty,
//     });
//   } catch (error) {
//     console.error("CREATE FACULTY ERROR 👉", error);
//     res.status(500).json({ message: "Failed to create faculty" });
//   }
// };
// // Get all faculty
// exports.getAllFaculty = async (req, res) => {
//   try {
//     const faculty = await User.find({ role: "faculty" }).select("-password");

//     res.status(200).json(faculty);
//   } catch (error) {
//     console.error("GET FACULTY ERROR 👉", error);
//     res.status(500).json({ message: "Failed to fetch faculty" });
//   }
// };
