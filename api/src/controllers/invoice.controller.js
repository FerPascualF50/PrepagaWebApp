import mongoose from "mongoose";
import { hasEmptyField, hasStringValue } from "../utils/validation.js";
import { createInvoiceByClientService, deleteInvoiceService, getInvoicesByUserService } from "../services/invoice.service.js";

export const createInvoicebyClientController = async (req, res) => {
  try {
    const { year, month, client, descriptionInvoice, price } = req.body;
    if (!mongoose.Types.ObjectId.isValid(client)) throw new Error('El ID proporcionado no tiene el formato válido');
    if (hasEmptyField({client, descriptionInvoice})) throw new Error('Ups...parece que los datos no son correctos');
    if (hasStringValue({year, month, price})) throw new Error('Ups...parece que los datos no numeros');
    if (month > 12 || month < 1) throw new Error('Ups...El mes seleccionado no es válido');
    if (year > 2999 || year < 2023) throw new Error('Ups...El año seleccionado no es válido');
    const invoiceCreated = await createInvoiceByClientService({ year, month, client, descriptionInvoice, price });
    return res.status(201).json({ success: true, response: invoiceCreated, message: 'Comprobante creada con éxito' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteInvoiceController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('El ID proporcionado no tiene el formato válido');
    if (hasEmptyField(id)) throw new Error('Ups...parece que los datos no son correctos');
    const deletedInvoice = await deleteInvoiceService(id);
    return res.status(201).json({ success: true, response: deletedInvoice, message: 'Comprobante eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getInvoicesByUserController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('El ID proporcionado no tiene el formato válido');
    if (hasEmptyField(id)) throw new Error('Ups...parece que los datos no son correctos');
    const allInvoiceByUser = await getInvoicesByUserService(id);
    return res.status(200).json({succsess: true, responde: allInvoiceByUser});
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};