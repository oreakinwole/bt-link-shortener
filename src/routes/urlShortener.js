import express from "express";
import { shorten, getFullUrl } from "../controllers/urlShortener.js";

const router = express.Router();

// shorten a URL
router.post("/", shorten);

// GET shortCode
router.get("/:shortCode", getFullUrl);

export default router;
