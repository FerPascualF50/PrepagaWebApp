import express from "express";
import { unauthorizedMiddleware } from "../utils/middlewares.js";
import { getPlansController, updatePriceController } from "../controllers/plan.controller.js";

export const planRouter = express.Router();
planRouter
  .get("/", getPlansController)
  .patch("/:id", unauthorizedMiddleware, updatePriceController);