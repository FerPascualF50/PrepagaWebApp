import express from "express";
import { UserController } from "../../controllers/userController.js";

export const userRouter = express.Router();

userRouter
  .get("/", UserController.getAllUsers)
  .get("/:id", UserController.userById)
  .post("/", UserController.createUser)
  .patch("/:id", UserController.updateUser)
  .delete("/:id", UserController.deleteUser)