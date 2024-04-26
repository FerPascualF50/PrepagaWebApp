import express from "express";
import { unauthorizedMiddleware } from "../utils/middlewares.js";
import {
  getInvoicesByUserController,
  deleteInvoiceController,
  createInvoicebyClientController,
} from "../controllers/invoice.controller.js";

export const invoiceRouter = express.Router();
invoiceRouter
  .get("/by-user/:id", getInvoicesByUserController)
  .post("/", unauthorizedMiddleware, createInvoicebyClientController)
  .patch("/delete/:id", unauthorizedMiddleware, deleteInvoiceController);