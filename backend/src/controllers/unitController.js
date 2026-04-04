const Unit = require("../models/Unit");

// Create unit
exports.createUnit = async (req, res) => {
  try {
    const unit = await Unit.create(req.body);
    res.status(201).json(unit);
  } catch (error) {
    res.status(500).json({ message: "Failed to create unit" });
  }
};

// Get units (with optional subject filter)
exports.getUnits = async (req, res) => {
  try {
    const { subject } = req.query;

    const filter = subject ? { subject } : {};

    const units = await Unit.find(filter);

    res.status(200).json(units);
  } catch (error) {
    console.error("GET UNITS ERROR 👉", error);
    res.status(500).json({ message: "Failed to fetch units" });
  }
};
