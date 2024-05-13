import express from "express";
import { unauthorizedMiddleware } from "../utils/middlewares.js";
import { createPDFInvoiceController, getInvoicesPDFController, createPDFInvoicesController } from "../controllers/invoice_pdf.controller.js"
import {
  getInvoicesByUserController,
  deleteInvoiceController,
  createInvoicesController,
  getInvoicesController,
  getClientsByPeriodController,
  updatePaymentController
} from "../controllers/invoice.controller.js";

export const invoiceRouter = express.Router();
invoiceRouter
  .get("/by_user", getInvoicesByUserController)
  .get("/pdf/:id", getInvoicesPDFController)
  .get("/clients", unauthorizedMiddleware, getClientsByPeriodController)
  .get("/all", unauthorizedMiddleware, getInvoicesController )
  .post("/pdf/:id",unauthorizedMiddleware, createPDFInvoiceController)
  .post("/pdf/all", unauthorizedMiddleware, createPDFInvoicesController)
  .post("/", unauthorizedMiddleware, createInvoicesController)
  .patch("/delete/:id", unauthorizedMiddleware, deleteInvoiceController)
  .patch("/payment/?", updatePaymentController)