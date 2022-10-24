const bcrypt = require("bcrypt");

const userConfig = {
  collection: "User",
  schema: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      set: (value) => bcrypt.hashSync(value, 10),
      type: String,
      required: true,
    },
    createdAt: Date,
    isAdmin: Boolean,
  },
};

module.exports = userConfig;
