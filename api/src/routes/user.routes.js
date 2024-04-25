import express from "express";
import { rolAccessMiddleware } from "../utils/middlewares.js";
import { getAllUsersController, getUserByIdController, updateUserToClientControler, deleteUserController } from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter
  .get("/", rolAccessMiddleware(['admin']), getAllUsersController)
  .get("/:id", rolAccessMiddleware(['admin']), getUserByIdController)
  .patch("/:id", rolAccessMiddleware(['user']),updateUserToClientControler)
  .patch("/delete/:id", rolAccessMiddleware(['user']), deleteUserController);