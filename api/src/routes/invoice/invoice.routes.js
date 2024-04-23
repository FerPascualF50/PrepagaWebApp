import express from "express";
import {
  // getAllInvoiceController,
  createInvoicebyClientController,
} from "../../controllers/invoice.controller.js";

export const invoiceRouter = express.Router();
invoiceRouter
  // .get("/", getAllInvoiceController)
  .post("/", createInvoicebyClientController);
