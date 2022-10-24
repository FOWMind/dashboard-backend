const cloudinary = require("cloudinary").v2;
const uploadFileToCloudinary = async (file, options) => {
  return await cloudinary.uploader
    .upload(file, options)
    .then((result) => {
      if (result) {
        return result;
      }
    })
    .catch((err) => {
      console.error("Error while uploading image to Cloudinary");
      return console.error(err);
    });
};

const uploadFilesToCloudinary = async (files, options) => {
  const uploadedFiles = [];
  const promises = files.map((file) => {
    return cloudinary.uploader
      .upload(file, options)
      .then((result) => {
        if (result) {
          uploadedFiles.push(result);
        }
      })
      .catch((err) => {
        console.error("Error while uploading image to Cloudinary");
        return console.error(err);
      });
  });
  await Promise.all(promises);
  return uploadedFiles;
};

module.exports = { uploadFileToCloudinary, uploadFilesToCloudinary };
