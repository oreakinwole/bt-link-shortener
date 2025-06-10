import express from "express";
import urlShortenerRoutes from "./routes/urlShortener.js";
import errorHandler from "./middlewares/errorHandler.js";

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

export default app;
