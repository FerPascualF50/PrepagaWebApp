import express from "express";
import { authMiddleware } from "../utils/middlewares.js";
import {
  createUserAuthController,
  userValidationController,
  userLoginController,
  forgotPassController,
  passValidationController,
  changePassController
} from "../controllers/user_auth.controller.js";

export const userAuthRouter = express.Router();
userAuthRouter
  .post("/signup", createUserAuthController)
  .post("/login", userLoginController)
  .get("/validate-email/:userId", userValidationController)
  .patch("/password/", forgotPassController)
  .patch("/validate-pass/", passValidationController)
  .patch("/change-paswword/:id", authMiddleware, changePassController);