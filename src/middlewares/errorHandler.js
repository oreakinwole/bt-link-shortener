const errorHandler = (err, req, res, next) => {
  // console.error(err.stack);
  res.status(500).json({
    error: "Internal server error",
    message: err?.message || "Something went wrong!",
  });
};

module.exports = errorHandler;
