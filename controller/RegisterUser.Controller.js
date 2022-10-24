const User = require("../database/models/User");
const checkApiKey = require("../utils/checkApiKey");
const { BadRequest, Unauthorized } = require("../utils/errors");

function RegisterUserController(req, res, next) {
  if (!checkApiKey(req.headers["x-api-key"]))
    return res.status(401).json(Unauthorized);

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json(BadRequest);
  }

  User.findOne({ email }).then((foundUser) => {
    if (foundUser) {
      return res.status(409).json({ message: "user already exist" });
    }

    const newUser = {
      name,
      email,
      password,
      createdAt: new Date(),
    };

    User.create(newUser, (err, doc) => {
      if (err) next(err);

      if (doc) {
        const { name, password, ...userData } = doc.toJSON();
        return res.status(201).json(userData);
      }
    });
  });
}

module.exports = RegisterUserController;
