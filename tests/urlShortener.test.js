const request = require("supertest");
const app = require("../src/app"); // Adjust the path to your Express app

describe("Link Shortener Service", () => {
  let shortCode;
  let shortUrl;
  const testUrl = "http://www.toasterpastries.com/poptarts";

  describe("POST /shorten", () => {
    test("should create a shortened URL", async () => {
      const response = await request(app)
        .post("/shorten")
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
        .post("/shorten")
        .send({ url: "not-a-valid-url" })
        .expect(400);

      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toContain("Invalid URL format");
    });
  });
});
