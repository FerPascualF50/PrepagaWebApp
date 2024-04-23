import express from "express";
import { userRouter } from "./user/user.routes.js";
import { userAuthRouter } from "./user/user_auth.routes.js";
import { invoiceRouter } from "./invoice/invoice.routes.js";
import { allRouter } from "./rol/all.routes.js";

export const router = express.Router();
router
	.use("/user", userRouter)
  	.use("/auth", userAuthRouter)
	.use("/all", allRouter)
	.use("/invoice", invoiceRouter);
