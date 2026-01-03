// src/redis.js
import { createClient } from "redis";
import { REDIS_URL } from "./config.js";

export const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on("error", (err) => console.error("Redis Error:", err));

(async () => {
  await redisClient.connect();
  console.log("Redis connected");
})();
