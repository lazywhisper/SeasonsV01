import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import * as db from "./db_utils.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Enhanced health check endpoint with database connectivity test
app.get("/make-server-025e2792/health", async (c) => {
  const health = {
    status: "ok",
    timestamp: new Date().toISOString(),
    services: {
      api: "operational",
      database: "unknown",
      kv_store: "operational",
    },
    version: "1.0.0",
  };

  // Test database connection
  try {
    const dbConnected = await db.testDatabaseConnection();
    health.services.database = dbConnected ? "operational" : "degraded";
    
    // If database is not connected, overall status is degraded
    if (!dbConnected) {
      health.status = "degraded";
    }
  } catch (error) {
    console.error('[Health] Database check failed:', error);
    health.services.database = "error";
    health.status = "degraded";
  }

  // Return appropriate status code
  const statusCode = health.status === "ok" ? 200 : 503;
  
  return c.json(health, statusCode);
});

Deno.serve(app.fetch);