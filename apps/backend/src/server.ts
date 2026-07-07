import app from "./app.js";
import { config } from "./config/config.js";
import { logger } from "./lib/logger.js";

const server = app.listen(config.PORT, () => {
  // logger.info(`🚀 Server running on http://localhost:${config.PORT}`);
  logger.info(
    {
      port: config.PORT,
      environment: config.NODE_ENV,
    },
    "Server started successfully",
  );
});

process.on("SIGINT", () => {
  logger.info("SIGINT received. Shutting down server...");

  server.close(() => {
    logger.info("Server stopped.");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Shutting down server...");

  server.close(() => {
    logger.info("Server stopped.");
    process.exit(0);
  });
});
