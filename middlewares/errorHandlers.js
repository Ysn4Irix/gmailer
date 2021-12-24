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
