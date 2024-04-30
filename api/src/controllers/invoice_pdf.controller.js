import mongoose from "mongoose";
import { createPDFInvoiceService, getInvoicesPDFService } from "../services/invoice_pdf.service.js";

export const createPDFInvoiceController = async (req, res) =>{
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('El ID proporcionado no tiene el formato válido');
    const invoice = await createPDFInvoiceService(id);
    return res.status(200).json({succsess: true, responde: invoice});
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const createPDFInvoicesController = async (req, res) =>{
  try {
    const { id } = req.body; // Recibir información del cuerpo de la solicitud
    // Llamar al servicio para crear el PDF
    const invoice = await createPDFInvoiceService({ clientId, number, year, month });
    return res.status(200).json({ success: true, response: invoice });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const getInvoicesPDFController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('El ID proporcionado no tiene el formato válido');
    const fileName = `${id}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    await getInvoicesPDFService(id, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};