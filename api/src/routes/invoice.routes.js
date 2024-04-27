import express from "express";
import { unauthorizedMiddleware } from "../utils/middlewares.js";
import {
  getInvoicesByUserController,
  deleteInvoiceController,
  createInvoicebyClientController,
  getInvoicesController
} from "../controllers/invoice.controller.js";

export const invoiceRouter = express.Router();
invoiceRouter
  .get("/:id", getInvoicesByUserController)
  .get("/", unauthorizedMiddleware, getInvoicesController )
  .post("/", unauthorizedMiddleware, createInvoicebyClientController)
  .patch("/delete/:id", unauthorizedMiddleware, deleteInvoiceController);