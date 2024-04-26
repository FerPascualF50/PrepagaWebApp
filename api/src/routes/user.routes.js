import express from "express";
import { authMiddleware, rolAccessMiddleware } from "../utils/middlewares.js";
import { getAllUsersController, getUserByIdController, updateUserToClientControler, deleteUserController, changePassController } from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter
  .get("/", rolAccessMiddleware(['admin']), getAllUsersController)
  .get("/:id", rolAccessMiddleware(['admin']), getUserByIdController)
  .patch("/", rolAccessMiddleware(['user']), updateUserToClientControler)
  .delete("/", rolAccessMiddleware(['user']), deleteUserController)
  .patch("/change-paswword/", authMiddleware, changePassController);