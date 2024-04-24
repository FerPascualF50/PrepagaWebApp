import express from "express";
import { rolAccessMiddleware } from "../utils/middlewares.js";
import {
  getInvoicesByUserController,
  deleteInvoiceController,
  createInvoicebyClientController,
} from "../controllers/invoice.controller.js";

export const invoiceRouter = express.Router();
invoiceRouter
  .get("/by-user/:id", getInvoicesByUserController)
  .post("/", rolAccessMiddleware(['admin', 'manager']), createInvoicebyClientController)
  .patch("/delete/:id", rolAccessMiddleware(['admin', 'manager']), deleteInvoiceController);