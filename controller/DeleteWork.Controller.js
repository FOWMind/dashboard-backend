const cloudinary = require("cloudinary").v2;
const Work = require("../database/models/Work");
const checkApiKey = require("../utils/checkApiKey");
const { Unauthorized } = require("../utils/errors");

function DeleteWorkController(req, res, next) {
  if (!checkApiKey(req.headers["x-api-key"]))
    return res.status(401).json(Unauthorized);

  const { id } = req.params;

  Work.findById(id, (err, doc) => {
    if (err) next(err);
    if (doc) {
      // delete all files in work folder
      cloudinary.api.delete_resources_by_prefix(
        `work/${doc.title}/`,
        (result) => {
          // delete work folder (must be empty)
          cloudinary.api.delete_folder(`work/${doc.title}/`, (result) => {
            Work.findByIdAndDelete(id)
              .then(() => res.status(204).end())
              .catch((err) => next);
          });
        }
      );
    } else {
      return res.status(404).end();
    }
  });
}

module.exports = DeleteWorkController;
