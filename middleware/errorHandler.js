const { BadRequest } = require("../utils/errors");

function errorHandler(err, req, res) {
  if (err.name === "CastError") return res.status(400).json(BadRequest);
  console.error(err);
}

module.exports = errorHandler;
