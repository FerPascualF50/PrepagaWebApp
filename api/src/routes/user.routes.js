import express from "express";
import { unauthorizedMiddleware } from "../utils/middlewares.js";
import { getAllUsersController, getUserByIdController, updateUserControler, deleteUserController, updatePassController, updateRolController, createUsersToAdminsController, patchPlanOnUserController } from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter
  .get("/", unauthorizedMiddleware, getAllUsersController)
  .get("/:id", unauthorizedMiddleware, getUserByIdController)
  .put("/", updateUserControler)
  .delete("/:id", deleteUserController)
  .patch("/change-paswword", updatePassController)
  .patch("/plan", patchPlanOnUserController)
  .patch("/rol", unauthorizedMiddleware, updateRolController)
  .post("/", unauthorizedMiddleware, createUsersToAdminsController);
  