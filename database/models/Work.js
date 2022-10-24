const { Schema, model } = require("mongoose");
const workConfig = require("./Work.config");

const workSchema = new Schema(workConfig.schema);
const Work = model(workConfig.collection, workSchema);

module.exports = Work;
