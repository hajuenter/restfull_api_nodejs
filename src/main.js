import { logger } from "./applications/logging.js";
import { web } from "./applications/web.js";
import { prismaClient } from "./applications/database.js";

(async () => {
  try {
    await prismaClient.$connect();
    logger.info("Connected to the database successfully!");
  } catch (error) {
    logger.error("Failed to connect to the database:", error);
    process.exit(1); // Hentikan aplikasi jika gagal terhubung
  }

  web.listen(3000, () => {
    logger.info("App started on port 3000");
  });
})();
