import express from "express";
import {
  createUserController,
  userValidationController,
  loginController,
  forgotPassController,
  passValidationController,
  validateToken
} from "../controllers/user_auth.controller.js";
import { authMiddleware } from "../utils/middlewares.js";


export const userAuthRouter = express.Router();
userAuthRouter
  .post("/signup", createUserController)
  .post("/login", loginController)
  .get("/validate-email/:userId", userValidationController)
  .get('/check-token', authMiddleware, validateToken)
  .patch("/validate-pass/", passValidationController)
  .patch("/password/", forgotPassController);