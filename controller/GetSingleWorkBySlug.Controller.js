const Work = require("../database/models/Work");
const { NotFound } = require("../utils/errors");

function GetSingleWorkBySlugController(req, res, next) {
  const { slug } = req.params;
  Work.findOne({ slug: slug.toLowerCase() }).exec((err, foundWork) => {
    if (err) next(err);
    if (foundWork) return res.status(200).json(foundWork);
    return res.status(404).json(NotFound);
  });
}

module.exports = GetSingleWorkBySlugController;
