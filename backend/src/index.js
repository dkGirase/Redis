// src/index.js
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import { PORT } from "./config.js";
import "./redis.js"; // Redis

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
