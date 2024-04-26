import express from "express";
import {
  createUserController,
  userValidationController,
  loginController,
  forgotPassController,
  passValidationController,
} from "../controllers/user_auth.controller.js";

export const userAuthRouter = express.Router();
userAuthRouter
  .post("/signup", createUserController)
  .post("/login", loginController)
  .get("/validate-email/:userId", userValidationController)
  .patch("/validate-pass/", passValidationController)
  .patch("/password/", forgotPassController);