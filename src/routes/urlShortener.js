import express from "express";
import { shorten } from "../controllers/urlShortener.js";

const router = express.Router();

// router.get('/', getUrl);
router.post("shorten-url", shorten);

export default router;
