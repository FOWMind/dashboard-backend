const Work = require("../database/models/Work");
const checkApiKey = require("../utils/checkApiKey");
const { Unauthorized, BadRequest } = require("../utils/errors");
const {
  uploadFileToCloudinary,
  uploadFilesToCloudinary,
} = require("../utils/cloudinaryUploader");

async function CreateWorkController(req, res, next) {
  const work = req.body;
  const {
    title,
    category,
    slug,
    repository,
    featuredImageRaw,
    images,
    videos,
    notes,
  } = work;
  if (!checkApiKey(req.headers["x-api-key"]))
    return res.status(401).json(Unauthorized);

  if (
    !work ||
    !title ||
    !category ||
    !slug ||
    !featuredImageRaw ||
    !images ||
    !notes
  ) {
    return res.status(400).json({
      ...BadRequest,
      message: "one or more fields need to be passed.",
    });
  }

  // Upload work featured image and save it
  const uploadedFeaturedImage = await uploadFileToCloudinary(featuredImageRaw, {
    resource_type: "image",
    use_filename: true,
    unique_filename: true,
    folder: `work/${title}/featured-image/`,
  });

  // Upload work images, save them
  const uploadedImages = await uploadFilesToCloudinary(images, {
    resource_type: "image",
    use_filename: true,
    unique_filename: true,
    folder: `work/${title}/images/`,
  });
  // and save their URLs
  const uploadedImagesUrls = uploadedImages.map((img) => img.secure_url);

  // Save work data including featuredImage and images URLs
  const workData = {
    date: new Date(),
    title,
    editedTitle: title,
    category,
    slug,
    repository: repository || {},
    featuredImage: uploadedFeaturedImage.secure_url,
    images: uploadedImagesUrls,
    videos: videos || [],
    notes,
  };

  // Save work to database
  Work.create(workData, (err, doc) => {
    if (err) next(err);
    if (doc) {
      return res.status(201).json(doc);
    }
    return res.status(404).end();
  });
}

module.exports = CreateWorkController;
