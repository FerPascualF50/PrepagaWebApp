import mongoose from "mongoose";
import { getPDFInvoiceService } from "../services/invoice_pdf.service.js";

export const getPDFInvoiceController = async (req, res) =>{
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('El ID proporcionado no tiene el formato válido');
    const invoice = await getPDFInvoiceService(id);
    return res.status(200).json({succsess: true, responde: invoice});
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};