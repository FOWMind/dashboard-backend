const Work = require("../database/models/Work");

function GetWorksController(req, res, next) {
  Work.find({})
    .then((result) => res.status(200).json(result))
    .catch((err) => next);
}

module.exports = GetWorksController;
