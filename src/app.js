import express from 'express';
import urlShortenerRoutes from './routes/urlShortener.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());

app.use('api/v1/shorten', urlShortenerRoutes);
app.use(errorHandler);

export default app;
