import express from "express";
import { getAllUsers, userById, updateUser, deleteUser } from "../../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter
  .get("/", getAllUsers)
  .get("/:id", userById)
  .patch("/:id", updateUser)
  .delete("/:id", deleteUser);