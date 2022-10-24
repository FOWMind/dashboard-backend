const { NotFound } = require("../utils/errors");

function notFound(req, res, next) {
  res.status(404).json(NotFound);
}

module.exports = notFound;
