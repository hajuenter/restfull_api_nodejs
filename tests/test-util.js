import { prismaClient } from "../src/applications/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "Hajuenter",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "Hajuenter",
    },
  });

  // Lalu buat user baru
  await prismaClient.user.create({
    data: {
      username: "Hajuenter",
      password: await bcrypt.hash("rahasia123", 10),
      name: "ACH. BAHRUL MA'ARIP",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "Hajuenter",
    },
  });
};
