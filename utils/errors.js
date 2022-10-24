const NotFound = {
  message: "not found",
  code: 404,
};

const BadRequest = {
  message: "bad request",
  code: 400,
};

const Forbidden = {
  message: "forbidden",
  code: 403,
};

const Unauthorized = {
  message: "unauthorized",
  code: 401,
};

module.exports = { BadRequest, NotFound, Forbidden, Unauthorized };
