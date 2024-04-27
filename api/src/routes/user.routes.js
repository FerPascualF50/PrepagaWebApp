import express from "express";
import { unauthorizedMiddleware } from "../utils/middlewares.js";
import { getAllUsersController, getUserByIdController, updateUserControler, deleteUserController, updatePassController, updateRolController } from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter
  .get("/", unauthorizedMiddleware, getAllUsersController)
  .get("/:id", unauthorizedMiddleware, getUserByIdController)
  .put("/:id", updateUserControler)
  .delete("/:id", deleteUserController)
  .patch("/change-paswword", updatePassController)
  .patch("/rol", unauthorizedMiddleware, updateRolController);
  