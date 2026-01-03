import express from "express";
import {
  createUser,
  createUsersBulk,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.post("/bulk", createUsersBulk);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
