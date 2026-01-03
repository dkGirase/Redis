// src/db.js
import pkg from "pg";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from "./config.js";
const { Pool } = pkg;

export const pool = new Pool({
  host: DB_HOST,
  user: String(DB_USER),
  password: String(DB_PASSWORD),
  database: DB_NAME,
  port: DB_PORT,
});

// optional test
(async () => {
  try {
    const client = await pool.connect();
    console.log("PostgreSQL connected ✅");
    client.release();
  } catch (err) {
    console.error("PostgreSQL connection failed:", err.message);
  }
})();
