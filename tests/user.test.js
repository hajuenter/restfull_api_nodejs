import supertest from "supertest";
import { web } from "../src/applications/web.js";
import { prismaClient } from "../src/applications/database.js";
import { logger } from "../src/applications/logging.js";

describe("POST /api/users", function () {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "Hajuenter",
      },
    });
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
