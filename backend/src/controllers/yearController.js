const Year = require("../models/Year");

exports.createYear = async (req, res) => {
  const year = await Year.create(req.body);
  res.json(year);
};
