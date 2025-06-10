# bt-link-shortener

# Clone or create the project
npm install

# Start the server
npm start

# Start with auto-reload
npm run dev

# Run tests
npm test


1. Shorten URL
POST /api/v1/shorten
Create a shortened URL 
Request:
json{
  "url": "https://www.example.com/bhefguiewef"
}


2. Redirect to Original URL
GET /api/v1/shorten/:shortCode
Redirects to the original URL and tracks analytics.
Response: HTTP 301 redirect to original URL

3. Get URL Information
GET /api/v1/shorten/info/:shortCode
Get information about a shortened URL without redirecting.