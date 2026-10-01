import Fastify from "fastify";
import helmet from "@fastify/helmet";

export function buildApp() {
  const app = Fastify({
    logger: {
      redact: ["req.headers.authorization", "req.headers.cookie"],
    },
  });

  app.register(helmet);
  app.get("/health", async () => ({ status: "ok" }));

  return app;
}