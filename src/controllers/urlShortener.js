import crypto from 'crypto';


// In-memory storage, In production we would use a Redis cluster
const urlStore = new Map();

const BASE62_CH =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function generateShortCode() {
  const buffer = crypto.randomBytes(6);
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += BASE62_CH[buffer[i] % 62];
  }
  return result;
}

function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export const shorten = (req, res, next) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      error: "URL is required",
      example: { url: "https://www.your-url.com" },
    });
  }

  if (!isValidUrl(url)) {
    return res.status(400).json({
      error: "Invalid URL format. Must start with http:// or https://",
      provided: url,
    });
  }

  // Check if URL already exists
  for (const [code, storedUrl] of urlStore) {
    if (storedUrl === url) {
      return res.json({
        shortUrl: `http://ln.er/${code}`,
        originalUrl: url,
        shortCode: code,
        cached: true,
      });
    }
  }

  // Generate new short code
  let shortCode;
  do {
    shortCode = generateShortCode();
  } while (urlStore.has(shortCode));

  urlStore.set(shortCode, url);

  res.status(201).json({
    shortUrl: `http://ln.er/${shortCode}`,
    originalUrl: url,
    shortCode: shortCode,
    cached: false,
  });
};

export const getFullUrl = (req, res) => {
  const { shortCode } = req.params;
  const originalUrl = urlStore.get(shortCode);

  if (!originalUrl) {
    return res.status(404).json({
      error: "Short URL not found",
      shortCode: shortCode,
    });
  }

  res.redirect(301, originalUrl);
};

export const getUrlInfo = (req, res) => {
  const { shortCode } = req.params;
  const originalUrl = urlStore.get(shortCode);

  if (!originalUrl) {
    return res.status(404).json({
      error: "Short URL not found",
      shortCode: shortCode,
    });
  }

  res.json({
    shortCode: shortCode,
    originalUrl: originalUrl,
    shortUrl: `http://ln.er/${shortCode}`,
  });
};
