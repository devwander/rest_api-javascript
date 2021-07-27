const request = require("supertest");
const app = require("../../src/app");

describe('Integration test of "home" router', () => {
  it("Test for get - index", async () => {
    const home = await request(app).get("/");
    expect(home.status).toBe(200);
  });
});
