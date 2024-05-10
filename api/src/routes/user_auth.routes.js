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
  .get('/check-token', authMiddleware, validateToken)
  .patch("/validate-email/:userId", userValidationController)
  .patch("/validate-pass", passValidationController)
  .patch("/password", forgotPassController);