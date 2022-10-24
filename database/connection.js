const mongoose = require("mongoose");
const DB = {
  NAME: process.env.DB_NAME || "test",
  USERNAME: process.env.DB_USERNAME,
  PWD: process.env.DB_PWD,
  CLUSTER: process.env.DB_CLUSTER,
};
const uri = `mongodb+srv://${DB.USERNAME}:${DB.PWD}@${DB.CLUSTER}.mongodb.net/${DB.NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.error(err);
  });
