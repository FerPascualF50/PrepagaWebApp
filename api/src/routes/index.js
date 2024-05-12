import express from "express";
import { userRouter } from "./user.routes.js";
import { userAuthRouter } from "./user_auth.routes.js";
import { planRouter } from "./plan.routes.js";
import { invoiceRouter } from "./invoice.routes.js";
import { authMiddleware } from "../utils/middlewares.js";
import { centerRouter } from "./center.router.js";


export const router = express.Router();
router
	.use("/users", authMiddleware, userRouter)
  .use("/auths", userAuthRouter)
	.use("/plans", authMiddleware, planRouter)
	.use("/invoices", authMiddleware, invoiceRouter)
	.use("/centers",  centerRouter);