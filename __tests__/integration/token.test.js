const request = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Administrator } = require("../../src/models");
const truncate = require("../utils/truncate");
const app = require("../../src/app");

describe('Integration test of "login" router', () => {
  beforeEach(async () => {
    await truncate();
  });

  it("JWT login token generation test - login", async () => {
    // Create
    const password_hash = await bcrypt.hash("test123JWT", 8);

    await Administrator.create({
      name: "Test JWT",
      email: "testjwt@test.com",
      password: password_hash,
    });

    // Login
    const loginAdmin = await request(app).post("/login").send({
      email: "testjwt@test.com",
      password: "test123JWT",
    });

    expect(loginAdmin.status).toBe(200);
  });
  it("Login test - incorrect data - login (ERROR)", async () => {
    const loginAdmin = await request(app).post("/login").send({
      email: "INCORECT@test.com",
      password: "INCORECT",
    });

    expect(loginAdmin.status).toBe(401);
  });

  it("Login test - missing data - login (ERROR)", async () => {
    const loginAdmin = await request(app).post("/login").send({
      email: "",
      password: "",
    });

    expect(loginAdmin.status).toBe(401);
  });

  it("Login test - incorrect password - login (ERROR)", async () => {
    // create
    const password_hash = await bcrypt.hash("incorrectPassword", 8);
    await Administrator.create({
      name: "Test incorrectPassword",
      email: "incorrectPassword@test.com",
      password: password_hash,
    });

    // login
    const loginAdmin = await request(app).post("/login").send({
      email: "incorrectPassword@test.com",
      password: "0000000",
    });

    expect(loginAdmin.status).toBe(401);
  });
});
