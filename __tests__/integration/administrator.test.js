const request = require("supertest");
const bcrypt = require("bcrypt");

const { Administrator } = require("../../src/models");
const truncate = require("../utils/truncate");
const app = require("../../src/app");

describe('Integration tests of "administrators" routes', () => {
  beforeEach(async () => {
    await truncate();
  });

  it("admin creation test - create", async () => {
    const createAdmin = await request(app).post("/administrators").send({
      name: "Test",
      email: "test@test.com",
      password: "test123",
    });

    expect(createAdmin.status).toBe(200);
  });

  it("admin creation test - create (ERROR)", async () => {
    const createAdmin = await request(app).post("/administrators").send({
      name: "Test ERROR",
      email: "testERROR", // invalid email
      password: "", // empty password
    });

    expect(createAdmin.status).toBe(400);
  });

  it("admin search test - index", async () => {
    // create
    const password_hash = await bcrypt.hash("testsearch", 8);
    await Administrator.create({
      name: "Test search",
      email: "search@test.com",
      password: password_hash,
    });

    // login
    const loginAdmin = await request(app).post("/login").send({
      email: "search@test.com",
      password: "testsearch",
    });

    const token = loginAdmin.text.split(":")[1].slice(1, -2);

    // index
    const searchAdmins = await request(app)
      .get("/administrators")
      .set("Authorization", `Bearer ${token}`);

    expect(searchAdmins.status).toBe(200);
  });

  it("admin search test - show", async () => {
    // create
    const password_hash = await bcrypt.hash("searchUnic", 8);
    const administrator = await Administrator.create({
      name: "Test search",
      email: "searchUnic@test.com",
      password: password_hash,
    });

    // login
    const loginAdmin = await request(app).post("/login").send({
      email: "searchUnic@test.com",
      password: "searchUnic",
    });

    const token = loginAdmin.text.split(":")[1].slice(1, -2);

    // show
    let parameter = administrator.id;
    const searchAdmin = await request(app)
      .get("/administrators/" + parameter)
      .set("Authorization", `Bearer ${token}`);

    expect(searchAdmin.status).toBe(200);
  });

  it("admin search test error - Incorrect UUID syntax - show (ERROR)", async () => {
    // create
    const password_hash = await bcrypt.hash("searchUnicERROR", 8);
    const administrator = await Administrator.create({
      name: "Test search ERROR",
      email: "searchUnicERROR@test.com",
      password: password_hash,
    });

    // login
    const loginAdmin = await request(app).post("/login").send({
      email: "searchUnicERROR@test.com",
      password: "searchUnicERROR",
    });

    const token = loginAdmin.text.split(":")[1].slice(1, -2);

    // show
    let parameter = "000000";
    const searchAdmin = await request(app)
      .get("/administrators/" + parameter)
      .set("Authorization", `Bearer ${token}`);

    expect(searchAdmin.status).toBe(400);
  });

  it("admin search test error - Administrator does not exist - show (ERROR)", async () => {
    // create
    const password_hash = await bcrypt.hash("searchUnicNotFound", 8);
    const administrator = await Administrator.create({
      name: "Test search NotFound",
      email: "searchUnicNotFound@test.com",
      password: password_hash,
    });

    // login
    const loginAdmin = await request(app).post("/login").send({
      email: "searchUnicNotFound@test.com",
      password: "searchUnicNotFound",
    });

    const token = loginAdmin.text.split(":")[1].slice(1, -2);

    // show
    let parameter = "00000000-0000-0000-0000-000000000000";
    const searchAdmin = await request(app)
      .get("/administrators/" + parameter)
      .set("Authorization", `Bearer ${token}`);

    expect(searchAdmin.status).toBe(400);
  });

  it("admin data change test - update", async () => {
    // create
    const password_hash = await bcrypt.hash("testUpdate", 8);
    const administrator = await Administrator.create({
      name: "Test Update",
      email: "testUpdate@test.com",
      password: password_hash,
    });

    // login
    const loginAdmin = await request(app).post("/login").send({
      email: "testUpdate@test.com",
      password: "testUpdate",
    });

    const token = loginAdmin.text.split(":")[1].slice(1, -2);

    // update
    let parameter = administrator.id;
    const updateAdmin = await request(app)
      .put("/administrators/" + parameter)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "TEST UPDATE USER MODIFICADO",
      });

    expect(updateAdmin.status).toBe(200);
  });

  it("admin data delete test - delete", async () => {
    // create
    const password_hash = await bcrypt.hash("testDelet", 8);
    const administrator = await Administrator.create({
      name: "Test Delet",
      email: "testDelet@test.com",
      password: password_hash,
    });

    // login
    const loginAdmin = await request(app).post("/login").send({
      email: "testDelet@test.com",
      password: "testDelet",
    });

    const token = loginAdmin.text.split(":")[1].slice(1, -2);

    // update
    let parameter = administrator.id;
    const deletAdmin = await request(app)
      .delete("/administrators/" + parameter)
      .set("Authorization", `Bearer ${token}`);

    expect(deletAdmin.status).toBe(200);
  });
});
