const request = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = require("../../src/app");
const { Administrator } = require("../../src/models");
const truncate = require("../utils/truncate");

describe('Integration test of "login" router', () => {
  beforeEach(async () => {
    await truncate();
  });

  it("JWT login token generation test", async () => {
    // Create test admin
    const password_hash = await bcrypt.hash("test123JWT", 8);

    const administrator = await Administrator.create({
      name: "Test JWT",
      email: "testjwt@test.com",
      password: password_hash,
    });

    // Login admin
    const loginAdmin = await request(app).post("/login").send({
      email: "testjwt@test.com",
      password: "test123JWT",
    });

    // const token = loginAdmin.text.split(":")[1].slice(1, -2);

    // const data = jwt.verify(token, process.env.TOKEN_SECRET);
    // const { id, email } = data;

    // const user = await Administrator.findOne({
    //   where: {
    //     id,
    //     email,
    //   },
    // });

    expect(loginAdmin.status).toBe(200);
  });
  it("Login test with incorrect data", async () => {
    const loginAdmin = await request(app).post("/login").send({
      email: "INCORECT@test.com",
      password: "INCORECT",
    });

    expect(loginAdmin.status).toBe(401);
  });
});
