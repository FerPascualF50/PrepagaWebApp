import express from "express";
import { createUserAuthController, userValidationController, userLoginController } from "../../controllers/user_auth.controller.js";

export const userAuthRouter = express.Router();

userAuthRouter
  .post("/signup", createUserAuthController)
  .post("/login", userLoginController)
  .get("/validate-email/:userId", userValidationController);