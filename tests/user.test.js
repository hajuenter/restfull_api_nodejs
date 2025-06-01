import supertest from "supertest";
import { web } from "../src/applications/web.js";
import { logger } from "../src/applications/logging.js";
import { removeTestUser, createTestUser } from "./test-util.js";

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

  it("error login if request is invalid", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "",
      password: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("error login if password is wrong", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "Hajuenter",
      password: "salah",
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("error login if username is wrong", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "salah",
      password: "salah",
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
