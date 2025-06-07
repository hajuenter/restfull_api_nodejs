import { ResponseError } from "../errors/response-error.js";

const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        status: err.status,
        message: err.message,
        errors: err.errors || err.message,
      })
      .end();
  } else {
    res
      .status(500)
      .json({
        status: 500,
        message: "Internal Server Error",
        errors: err.message,
      })
      .end();
  }
};

export { errorMiddleware };
