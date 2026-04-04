const Department = require("../models/Department");

// ===============================
// Create Department
// ===============================
exports.createDepartment = async (req, res) => {
  try {
    console.log("REQ BODY 👉", req.body);

    const { name, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({
        message: "Name and Code are required",
      });
    }

    // Prevent duplicate department
    const existing = await Department.findOne({ code });

    if (existing) {
      return res.status(400).json({
        message: "Department already exists",
      });
    }

    const dept = await Department.create({
      name,
      code,
    });

    res.status(201).json(dept);
  } catch (error) {
    console.error("CREATE DEPARTMENT ERROR 👉", error);

    res.status(500).json({
      message: "Failed to create department",
    });
  }
};

// ===============================
// Get All Departments
// ===============================
exports.getDepartments = async (req, res) => {
  try {
    const depts = await Department.find().sort({ createdAt: -1 });

    res.status(200).json(depts);
  } catch (error) {
    console.error("GET DEPARTMENTS ERROR 👉", error);

    res.status(500).json({
      message: "Failed to fetch departments",
    });
  }
};

// ===============================
// Delete Department
// ===============================
exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const dept = await Department.findByIdAndDelete(id);

    if (!dept) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    res.status(200).json({
      message: "Department deleted successfully",
    });
  } catch (error) {
    console.error("DELETE DEPARTMENT ERROR 👉", error);

    res.status(500).json({
      message: "Delete failed",
    });
  }
};
