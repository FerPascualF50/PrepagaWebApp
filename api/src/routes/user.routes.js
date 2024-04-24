import express from "express";
import { getAllUsersController, getUserByIdController, updateUserToClientControler, deleteUserController } from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter
  .get("/", getAllUsersController)
  .get("/:id", getUserByIdController)
  .patch("/:id", updateUserToClientControler)
  .patch("/delete/:id", deleteUserController);