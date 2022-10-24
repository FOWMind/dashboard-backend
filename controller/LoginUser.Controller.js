const bcrypt = require("bcrypt");
const User = require("../database/models/User");
const jwt = require("jsonwebtoken");
const checkApiKey = require("../utils/checkApiKey");
const { BadRequest, Unauthorized } = require("../utils/errors");

function LoginUserController(req, res, next) {
  if (!checkApiKey(req.headers["x-api-key"]))
    return res.status(401).json(Unauthorized);

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json(BadRequest);
  }

  User.findOne({ email }).exec((error, foundUser) => {
    if (error) next(error);
    if (!foundUser) {
      return res
        .status(404)
        .json({ status: 404, message: "email or password incorrect" });
    }

    bcrypt
      .compare(password, foundUser.password)
      .then((result) => {
        if (result) {
          // Logged
          const token = jwt.sign(
            { _id: foundUser._id },
            process.env.JWT_USER_SECRET
          );
          res
            .status(200)
            .json({ status: 200, message: "successfully logged", token });
        }
        // Incorrect password
        res
          .status(404)
          .json({ status: 404, message: "email or password incorrect" });
      })
      .catch((error) => next);
  });
}

module.exports = LoginUserController;
