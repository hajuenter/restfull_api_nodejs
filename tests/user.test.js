import supertest from "supertest";
import { web } from "../src/applications/web.js";
import { logger } from "../src/applications/logging.js";
import { removeTestUser, createTestUser, getTestUser } from "./test-util.js";
import bcrypt from "bcrypt";

describe("POST /api/users", function () {
  afterEach(async () => {
    await removeTestUser();
  });

  it("success register user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "Hajuenter",
      password: "rahasia123",
      name: "ACH. BAHRUL MA'ARIP",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("Hajuenter");
    expect(result.body.data.name).toBe("ACH. BAHRUL MA'ARIP");
    expect(result.body.password).toBeUndefined();
  });

  it("errors register user request is invalid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("errors register user if username is alredy registered", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "Hajuenter",
      password: "rahasia123",
      name: "ACH. BAHRUL MA'ARIP",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("Hajuenter");
    expect(result.body.data.name).toBe("ACH. BAHRUL MA'ARIP");
    expect(result.body.password).toBeUndefined();

    result = await supertest(web).post("/api/users").send({
      username: "Hajuenter",
      password: "rahasia123",
      name: "ACH. BAHRUL MA'ARIP",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/users/login", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("success login", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "Hajuenter",
      password: "rahasia123",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("test");
  });

  it("errors login if request is invalid", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "",
      password: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("errors login if password is wrong", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "Hajuenter",
      password: "salah",
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("errors login if username is wrong", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "salah",
      password: "salah",
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  describe("GET /api/users/current", function () {
    beforeEach(async () => {
      await createTestUser();
    });

    afterEach(async () => {
      await removeTestUser();
    });

    it("success get current user", async () => {
      const result = await supertest(web)
        .get("/api/users/current")
        .set("Authorization", "test");

      expect(result.status).toBe(200);
      expect(result.body.data.username).toBe("Hajuenter");
      expect(result.body.data.name).toBe("ACH. BAHRUL MA'ARIP");
    });

    it("errors reject if token is invalid", async () => {
      const result = await supertest(web)
        .get("/api/users/current")
        .set("Authorization", "salah");

      expect(result.status).toBe(401);
      expect(result.body.errors).toBeDefined();
    });
  });
});

describe("PATCH /api/users/current", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("success update user", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "Bahrul",
        password: "rahasialagi",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("Hajuenter");
    expect(result.body.data.name).toBe("Bahrul");

    const user = await getTestUser();
    expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true);
  });

  it("success update user name", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "Bahrul lagi",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("Hajuenter");
    expect(result.body.data.name).toBe("Bahrul lagi");
  });

  it("success update user password", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        password: "rahasialagiaja",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("Hajuenter");
    expect(result.body.data.name).toBe("ACH. BAHRUL MA'ARIP");

    const user = await getTestUser();
    expect(await bcrypt.compare("rahasialagiaja", user.password)).toBe(true);
  });

  it("errors if request is not valid", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "salah")
      .send({});

    expect(result.status).toBe(401);
  });
});

describe("DELETE /api/users/logout", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("success logout", async () => {
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("Success");

    const user = await getTestUser();
    expect(user.token).toBeNull();
  });

  it("errors logout if token is invalid", async () => {
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
  });
});
