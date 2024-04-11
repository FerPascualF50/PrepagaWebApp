import express from "express";
import { userRouter } from "./user/userRoutes.js";

const routes = express();

routes.use("/users", userRouter);
