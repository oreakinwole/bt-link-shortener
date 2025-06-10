const express = require("express");
const { shorten, getFullUrl, getUrlInfo } = require("../controllers/urlShortener.js");

const router = express.Router();

// shorten a URL
router.post("/", shorten);

// GET shortCode
router.get("/:shortCode", getFullUrl);

// Get info on the URL
router.get('/info/:shortCode', getUrlInfo);

module.exports = router;
