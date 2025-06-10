const express = require("express");
const urlShortenerRoutes = require("./routes/urlShortener.js");
const errorHandler = require("./middlewares/errorHandler.js");

const app = express();
app.use(express.json());

app.use("/api/v1/shorten", urlShortenerRoutes);
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
    message: "The requested resource was not found",
  });
});

module.exports = app;
