import { pool } from "../db.js";
import { redisClient } from "../redis.js";

const USERS_CACHE_KEY = "users_cache";
const TTL = 60; // seconds

// CREATE SINGLE USER
export const createUser = async (req, res) => {
  const { name, email, age } = req.body;

  await pool.query("INSERT INTO users(name,email,age) VALUES($1,$2,$3)", [
    name,
    email,
    age,
  ]);

  // clear cache
  await redisClient.del(USERS_CACHE_KEY);
  res.json({ message: "User created" });
};

// CREATE MULTIPLE USERS
export const createUsersBulk = async (req, res) => {
  const users = req.body;

  const values = users
    .map((u, i) => `($${i * 3 + 1},$${i * 3 + 2},$${i * 3 + 3})`)
    .join(",");

  const flatValues = users.flatMap((u) => [u.name, u.email, u.age]);

  await pool.query(
    `INSERT INTO users(name,email,age) VALUES ${values}`,
    flatValues
  );

  await redisClient.del(USERS_CACHE_KEY);
  res.json({ message: "Bulk users added" });
};

// READ ALL USERS (with cache)
export const getUsers = async (req, res) => {
  try {
    const cached = await redisClient.get(USERS_CACHE_KEY);

    if (cached) return res.json({ source: "redis", data: JSON.parse(cached) });

    const result = await pool.query("SELECT * FROM users");
    await redisClient.setEx(USERS_CACHE_KEY, TTL, JSON.stringify(result.rows));

    res.json({ source: "db", data: result.rows });
  } catch (err) {
    console.error("GET USERS ERROR:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// READ SINGLE USER BY ID (with cache)
export const getUserById = async (req, res) => {
  const { id } = req.params;
  const USER_KEY = `user:${id}`;

  try {
    const cached = await redisClient.get(USER_KEY);
    if (cached) return res.json({ source: "redis", data: JSON.parse(cached) });

    const result = await pool.query("SELECT * FROM users WHERE id=$1", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ error: "User not found" });

    await redisClient.setEx(USER_KEY, TTL, JSON.stringify(result.rows[0]));

    res.json({ source: "db", data: result.rows[0] });
  } catch (err) {
    console.error("GET USER BY ID ERROR:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  await pool.query("UPDATE users SET name=$1,email=$2,age=$3 WHERE id=$4", [
    name,
    email,
    age,
    id,
  ]);

  // invalidate caches
  await redisClient.del(USERS_CACHE_KEY);
  await redisClient.del(`user:${id}`);

  res.json({ message: "User updated" });
};

// DELETE USER
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM users WHERE id=$1", [id]);

  // invalidate caches
  await redisClient.del(USERS_CACHE_KEY);
  await redisClient.del(`user:${id}`);

  res.json({ message: "User deleted" });
};
