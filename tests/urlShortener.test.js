const request = require("supertest");
const app = require("../src/app"); // Adjust the path as necessary

describe("Link Shortener Service", () => {
  let shortCode;
  let shortUrl;
  const testUrl =
    "http://www.toasterpastries.com/poptarts";

  describe("POST /shorten", () => {
    test("should create a shortened URL", async () => {
      const response = await request(app)
        .post("/api/v1/shorten")
        .send({ url: testUrl })
        .expect(201);

      expect(response.body).toHaveProperty("shortUrl");
      expect(response.body).toHaveProperty("originalUrl", testUrl);
      expect(response.body).toHaveProperty("shortCode");

      shortCode = response.body.shortCode;
      shortUrl = response.body.shortUrl;
    });

   
    test("should reject invalid URLs", async () => {
      const response = await request(app)
        .post("/api/v1/shorten")
        .send({ url: "not-a-valid-url" })
        .expect(400);

      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toContain("Invalid URL format");
    });

  
  });

  describe("GET /api/v1/shorten/info/:shortCode", () => {
    test("should return URL info without redirect", async () => {
      const response = await request(app)
        .get(`/api/v1/shorten/info/${shortCode}`)
        .expect(200);

      expect(response.body).toHaveProperty("shortCode", shortCode);
      expect(response.body).toHaveProperty("originalUrl", testUrl);
      expect(response.body).toHaveProperty("shortUrl");
    });

    test("should return 404 for non-existent short code", async () => {
      const response = await request(app)
        .get("/api/v1/shorten/info/nonexistent")
        .expect(404);

      expect(response.body).toHaveProperty("error");
    });
  });
  
});
