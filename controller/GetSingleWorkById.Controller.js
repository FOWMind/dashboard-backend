const Work = require("../database/models/Work");
const { NotFound } = require("../utils/errors");

function GetSingleWorkByIdController(req, res, next) {
  const { id } = req.params;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    // SEE https://stackoverflow.com/questions/14940660/whats-mongoose-error-cast-to-objectid-failed-for-value-xxx-at-path-id
    // Yes, it's a valid ObjectId, proceed with `findById` call.
    return Work.findById(id, (err, doc) => {
      if (err) next(err);
      if (doc) {
        return res.status(200).json(doc);
      }
      return res.status(404).json(NotFound);
    });
  }
  return res.status(404).json(NotFound);
}

module.exports = GetSingleWorkByIdController;
