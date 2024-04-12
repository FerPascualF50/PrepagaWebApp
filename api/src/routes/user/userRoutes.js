import express from "express";
import { getAllUsers, userById, createUser, updateUser, deleteUser } from "../../controllers/userController.js";

export const userRouter = express.Router();

userRouter
  .get("/", getAllUsers)
  .get("/:id", userById)
  .post("/", createUser)
  .patch("/:id", updateUser)
  .delete("/:id", deleteUser)