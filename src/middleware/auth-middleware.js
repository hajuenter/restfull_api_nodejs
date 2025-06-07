import { prismaClient } from "../applications/database.js";
import { ResponseError } from "../errors/response-error.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) {
      throw new ResponseError(401, "Unauthorized");
    }

    const user = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
    });

    if (!user) {
      throw new ResponseError(401, "Unauthorized");
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
