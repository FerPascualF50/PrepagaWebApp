import express from "express";
import { getCentersController } from "../controllers/centers.controller.js";

export const centerRouter = express.Router();
centerRouter
  .get("/", getCentersController)