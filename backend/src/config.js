// src/config.js
import dotenv from "dotenv";

dotenv.config(); // load env FIRST

export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const DB_PORT = Number(process.env.DB_PORT);

export const REDIS_URL = process.env.REDIS_URL;
export const PORT = process.env.PORT || 5000;
