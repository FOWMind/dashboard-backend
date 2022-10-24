const { Schema, model } = require("mongoose");
const userConfig = require("./User.config");

const userSchema = new Schema(userConfig.schema);
const User = model(userConfig.collection, userSchema);

module.exports = User;
