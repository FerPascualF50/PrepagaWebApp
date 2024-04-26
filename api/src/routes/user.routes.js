import express from "express";
import { unauthorizedMiddleware } from "../utils/middlewares.js";
import { getAllUsersController, getUserByIdController, updateUserToClientControler, deleteUserController, updatePassController, updateRolController } from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter
  .get("/", unauthorizedMiddleware, getAllUsersController)
  .get("/:id", unauthorizedMiddleware, getUserByIdController)
  .patch("/", updateUserToClientControler)
  .delete("/", deleteUserController)
  .patch("/change-paswword", updatePassController)
  .patch("/rol", unauthorizedMiddleware, updateRolController);
  