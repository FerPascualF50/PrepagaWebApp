import express from "express";
import {
  getInvoicesByUserController,
  deleteInvoiceController,
  createInvoicebyClientController,
} from "../controllers/invoice.controller.js";

export const invoiceRouter = express.Router();
invoiceRouter
  .get("/by-user/:id", getInvoicesByUserController)
  .post("/", createInvoicebyClientController)
  .patch("/delete/:id", deleteInvoiceController);