const { CustomAPIError } = require("../errors/customError.js");
const errorHandlerMiddleware = (err, req, res, next) => {
  //   console.log(err.msg);
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: "something went wrong" });
};

module.exports = errorHandlerMiddleware;
