const crypto = require('crypto');
const { promisify } = require('util');

// In-memory storage for high performance (production would use Redis cluster)
const urlStore = new Map();

// Base62 encoding for shorter URLs
const BASE62_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function generateShortCode() {
    const buffer = crypto.randomBytes(6);
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += BASE62_CHARS[buffer[i] % 62];
    }
    return result;
}

function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
}

export const shorten = async (req, res, next) => {
 const { url } = req.body;
    
    if (!url) {
        return res.status(400).json({ 
            error: 'URL is required',
            example: { url: 'https://www.example.com' }
        });
    }
    
    if (!isValidUrl(url)) {
        return res.status(400).json({ 
            error: 'Invalid URL format. Must start with http:// or https://',
            provided: url
        });
    }
    
    // Check if URL already exists
    for (const [code, storedUrl] of urlStore) {
        if (storedUrl === url) {
            return res.json({
                shortUrl: `http://do.co/${code}`,
                originalUrl: url,
                shortCode: code,
                cached: true
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
        shortUrl: `http://do.co/${shortCode}`,
        originalUrl: url,
        shortCode: shortCode,
        cached: false
    });
};
