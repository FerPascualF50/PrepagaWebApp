import express from "express";
import { unauthorizedMiddleware } from "../utils/middlewares.js";
import { createPDFInvoiceController, getInvoicesPDFController } from "../controllers/invoice_pdf.controller.js"
import {
  getInvoicesByUserController,
  deleteInvoiceController,
  createInvoicesController,
  getInvoicesController,
} from "../controllers/invoice.controller.js";

export const invoiceRouter = express.Router();
invoiceRouter
  .get("/:id", getInvoicesByUserController)
  .get("/pdf/:id", getInvoicesPDFController)
  .get("/", unauthorizedMiddleware, getInvoicesController )
  .post("/pdf/:id",unauthorizedMiddleware, createPDFInvoiceController)
  .post("/", unauthorizedMiddleware, createInvoicesController)
  .patch("/delete/:id", unauthorizedMiddleware, deleteInvoiceController);