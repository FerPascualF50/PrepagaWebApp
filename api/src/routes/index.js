import express from "express";
import { userRouter } from "./user/user.routes.js";
import { userAuthRouter } from "./user/user_auth.routes.js";
import { rolRouter } from "./rol/rol.routes.js";

export const router = express.Router();
router
	.use("/user", userRouter)
  .use("/auth", userAuthRouter)
	.use("/rol", rolRouter);