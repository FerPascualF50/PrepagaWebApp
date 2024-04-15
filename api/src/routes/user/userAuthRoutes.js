import express from "express";
import { registerUser, loginUser } from "../../controllers/userAuthController.js";

export const userAuthRouter = express.Router();

userAuthRouter
  .post("/signup", registerUser)
  .post("/login", loginUser);