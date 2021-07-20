const request = require("supertest");
const bcrypt = require("bcrypt");

const { Administrator, Member } = require("../../src/models");
const truncate = require("../utils/truncate");
const app = require("../../src/app");

describe("", () => {
  beforeEach(async () => {
    await truncate();
  });
  it("member creation test - create", async () => {
    // create admin and login
    const password_hash = await bcrypt.hash("testeMember", 8);

    await Administrator.create({
      name: "Test Member",
      email: "testMember@test.com",
      password: password_hash,
    });

    const loginAdmin = await request(app).post("/login").send({
      email: "testMember@test.com",
      password: "testeMember",
    });

    const token = loginAdmin.text.split(":")[1].slice(1, -2);

    // create member
    const createMember = await request(app)
      .post("/members/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test Member Create",
        email: "testmember@test.com",
      });

    expect(createMember.status).toBe(200);
  });

  it("member creation test error - create (ERROR)", async () => {
    // create admin and login
    const password_hash = await bcrypt.hash("testeMemberError", 8);

    await Administrator.create({
      name: "Test MemberError",
      email: "testMemberError@test.com",
      password: password_hash,
    });

    const loginAdmin = await request(app).post("/login").send({
      email: "testMemberError@test.com",
      password: "testeMemberError",
    });

    const token = loginAdmin.text.split(":")[1].slice(1, -2);

    // create member
    const createMember = await request(app)
      .post("/members/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test Member Create",
        email: "",
      });

    expect(createMember.status).toBe(400);
  });

  it("member data search test - index", async () => {
    // create admin and login
    const password_hash = await bcrypt.hash("testIndex", 8);

    await Administrator.create({
      name: "Test Member Index",
      email: "testMemberIndex@test.com",
      password: password_hash,
    });

    const loginAdmin = await request(app).post("/login").send({
      email: "testMemberIndex@test.com",
      password: "testIndex",
    });

    const token = loginAdmin.text.split(":")[1].slice(1, -2);

    // create member
    await Member.create({
      name: "Test Index",
      email: "testIndex@test.com",
      password: password_hash,
    });

    // search member's
    const searchMember = await request(app)
      .get("/members")
      .set("Authorization", `Bearer ${token}`);

    expect(searchMember.status).toBe(200);
  });

  it("member data search test - show", async () => {
    // create admin and login
    const password_hash = await bcrypt.hash("testShow", 8);

    await Administrator.create({
      name: "Test Member Show",
      email: "testMemberShow@test.com",
      password: password_hash,
    });

    const loginAdmin = await request(app).post("/login").send({
      email: "testMemberShow@test.com",
      password: "testShow",
    });

    const token = loginAdmin.text.split(":")[1].slice(1, -2);

    // create member
    const member = await Member.create({
      name: "Test Index",
      email: "testIndex@test.com",
      password: password_hash,
    });

    // search member's
    let parameter = member.id;
    const searchMember = await request(app)
      .get("/members/" + parameter)
      .set("Authorization", `Bearer ${token}`);

    expect(searchMember.status).toBe(200);
  });

  it("member data search test - Member does not exist - show (ERROR)", async () => {
    // create admin and login
    const password_hash = await bcrypt.hash("testShowError", 8);

    await Administrator.create({
      name: "Test Member ShowError",
      email: "testMemberShowError@test.com",
      password: password_hash,
    });

    const loginAdmin = await request(app).post("/login").send({
      email: "testMemberShowError@test.com",
      password: "testShowError",
    });

    const token = loginAdmin.text.split(":")[1].slice(1, -2);

    // search member's
    let parameter = "00000000-0000-0000-0000-000000000000";
    const searchMember = await request(app)
      .get("/members/" + parameter)
      .set("Authorization", `Bearer ${token}`);

    expect(searchMember.status).toBe(400);
  });

  it("member data search test - Incorrect UUID syntax - show (ERROR)", async () => {
    // create admin and login
    const password_hash = await bcrypt.hash("testShowError", 8);

    await Administrator.create({
      name: "Test Member ShowError",
      email: "testMemberShowError@test.com",
      password: password_hash,
    });

    const loginAdmin = await request(app).post("/login").send({
      email: "testMemberShowError@test.com",
      password: "testShowError",
    });

    const token = loginAdmin.text.split(":")[1].slice(1, -2);

    // search member's
    let parameter = "000000";
    const searchMember = await request(app)
      .get("/members/" + parameter)
      .set("Authorization", `Bearer ${token}`);

    expect(searchMember.status).toBe(400);
  });

  it("member data update test - update", async () => {
    // create admin and login
    const password_hash = await bcrypt.hash("testeUpdate", 8);

    await Administrator.create({
      name: "Test Member Update",
      email: "testMemberUpdate@test.com",
      password: password_hash,
    });

    const loginAdmin = await request(app).post("/login").send({
      email: "testMemberUpdate@test.com",
      password: "testeUpdate",
    });

    const token = loginAdmin.text.split(":")[1].slice(1, -2);

    // create member
    const member = await Member.create({
      name: "Test Update",
      email: "testUpdate@test.com",
      password: password_hash,
    });

    // delete member
    let parameter = member.id;
    const updateMember = await request(app)
      .put("/members/" + parameter)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Update MODIFICADO",
      });

    expect(updateMember.status).toBe(200);
  });

  it("member data update test - Member does not exist - update (ERROR)", async () => {
    // create admin and login
    const password_hash = await bcrypt.hash("testeUpdate", 8);

    await Administrator.create({
      name: "Test Member Update",
      email: "testMemberUpdate@test.com",
      password: password_hash,
    });

    const loginAdmin = await request(app).post("/login").send({
      email: "testMemberUpdate@test.com",
      password: "testeUpdate",
    });

    const token = loginAdmin.text.split(":")[1].slice(1, -2);

    // delete member
    let parameter = "00000000-0000-0000-0000-000000000000";
    const updateMember = await request(app)
      .put("/members/" + parameter)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Update MODIFICADO",
      });

    expect(updateMember.status).toBe(400);
  });

  it("member data update test - Incorrect UUID syntax - update (ERROR)", async () => {
    // create admin and login
    const password_hash = await bcrypt.hash("testeUpdate", 8);

    await Administrator.create({
      name: "Test Member Update",
      email: "testMemberUpdate@test.com",
      password: password_hash,
    });

    const loginAdmin = await request(app).post("/login").send({
      email: "testMemberUpdate@test.com",
      password: "testeUpdate",
    });

    const token = loginAdmin.text.split(":")[1].slice(1, -2);

    // delete member
    let parameter = "00000000";
    const updateMember = await request(app)
      .put("/members/" + parameter)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Update MODIFICADO",
      });

    expect(updateMember.status).toBe(400);
  });

  it("member data delete test - delete", async () => {
    // create admin and login
    const password_hash = await bcrypt.hash("testeDelet", 8);

    await Administrator.create({
      name: "Test Member delet",
      email: "testMemberDelet@test.com",
      password: password_hash,
    });

    const loginAdmin = await request(app).post("/login").send({
      email: "testMemberDelet@test.com",
      password: "testeDelet",
    });

    const token = loginAdmin.text.split(":")[1].slice(1, -2);

    // create member
    const member = await Member.create({
      name: "Test Delet",
      email: "testDelet@test.com",
      password: password_hash,
    });

    // delete member
    let parameter = member.id;
    const deleteMember = await request(app)
      .delete("/members/" + parameter)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteMember.status).toBe(200);
  });

  it("member data delete test - Member does not exist - delete (ERROR)", async () => {
    // create admin and login
    const password_hash = await bcrypt.hash("testeDelet", 8);

    await Administrator.create({
      name: "Test Member delet",
      email: "testMemberDelet@test.com",
      password: password_hash,
    });

    const loginAdmin = await request(app).post("/login").send({
      email: "testMemberDelet@test.com",
      password: "testeDelet",
    });

    const token = loginAdmin.text.split(":")[1].slice(1, -2);

    // delete member
    let parameter = "00000000-0000-0000-0000-000000000000";
    const deleteMember = await request(app)
      .delete("/members/" + parameter)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteMember.status).toBe(400);
  });

  it("member data delete test - Incorrect UUID syntax - delete (ERROR)", async () => {
    // create admin and login
    const password_hash = await bcrypt.hash("testeDelet", 8);

    await Administrator.create({
      name: "Test Member delet",
      email: "testMemberDelet@test.com",
      password: password_hash,
    });

    const loginAdmin = await request(app).post("/login").send({
      email: "testMemberDelet@test.com",
      password: "testeDelet",
    });

    const token = loginAdmin.text.split(":")[1].slice(1, -2);

    // delete member
    let parameter = "00000000";
    const deleteMember = await request(app)
      .delete("/members/" + parameter)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteMember.status).toBe(400);
  });
});
