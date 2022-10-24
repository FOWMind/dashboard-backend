const Work = require("../database/models/Work");
const checkApiKey = require("../utils/checkApiKey");
const { Unauthorized, BadRequest } = require("../utils/errors");

function EditWorkController(req, res, next) {
  if (!checkApiKey(req.headers["x-api-key"]))
    return res.status(401).json(Unauthorized);

  const { id } = req.params;
  const work = req.body;
  if (!work) {
    return res.status(400).json(BadRequest);
  }

  const newWorkInfo = {
    ...work,
    editAt: new Date(),
  };

  Work.findByIdAndUpdate(id, newWorkInfo, { new: true })
    .then((result) => res.status(200).json(result))
    .catch((err) => next);
}

module.exports = EditWorkController;
