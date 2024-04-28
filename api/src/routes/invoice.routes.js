import express from "express";
import { unauthorizedMiddleware } from "../utils/middlewares.js";
import { getPDFInvoiceController } from "../controllers/incoice_pdf.controller.js"
import {
  getInvoicesByUserController,
  deleteInvoiceController,
  createInvoicebyClientController,
  getInvoicesController,
} from "../controllers/invoice.controller.js";

export const invoiceRouter = express.Router();
invoiceRouter
  .get("/:id", getInvoicesByUserController)
  .get("/", unauthorizedMiddleware, getInvoicesController )
  .post("/pdf/:id",getPDFInvoiceController)
  .post("/:id", unauthorizedMiddleware, createInvoicebyClientController)
  .patch("/delete/:id", unauthorizedMiddleware, deleteInvoiceController);