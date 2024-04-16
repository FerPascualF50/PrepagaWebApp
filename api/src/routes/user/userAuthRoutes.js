import express from "express";
import { registerUser, loginUser, sendValidationEmailController, validateEmail } from "../../controllers/userAuthController.js";

export const userAuthRouter = express.Router();

userAuthRouter
  .post("/signup", registerUser)
  .post("/login", loginUser)
  .post("/send-validation-email/:userId", sendValidationEmailController)
  .get("/validate-email/:userId", validateEmail);