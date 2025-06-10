import express from 'express';
import { getUrl } from '../controllers/urlShortener.js';

const router = express.Router();

router.get('/', getUrl);
// router.post('/', createUser);

export default router;
