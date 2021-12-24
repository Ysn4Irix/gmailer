/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 24-12-2021
 * @modify date 24-12-2021
 * @desc [Errors Handlers Middlewares]
 */

const notFound = (req, res, next) => {
  const error = new Error(`Request Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, _, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "🙄🙄" : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
