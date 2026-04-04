const Semester = require("../models/Semester");

exports.createSemester = async (req, res) => {
  const sem = await Semester.create(req.body);
  res.json(sem);
};
