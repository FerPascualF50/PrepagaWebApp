import mongoose from "mongoose";
import { hasEmptyField, hasStringValue } from "../utils/validation.js";
import { createInvoicesService, deleteInvoiceService, getInvoicesByUserService, getInvoicesService } from "../services/invoice.service.js";

export const createInvoicesController = async (req, res) => {
  try {
    const { year, month, ids } = req.body;
    if (hasStringValue({year, month})) throw new Error('Los datos de año y mes deben ser números');
    if (month > 12 || month < 1) throw new Error('El mes seleccionado no es válido');
    if (year > 2999 || year < 2023) throw new Error('El año seleccionado no es válido');
    let index = 0;
    const createdInvoices = [];
    const processNextInvoice = async () => {
      if (index < ids.length) {
        const invoiceId = ids[index];
        try {
          if (!mongoose.Types.ObjectId.isValid(invoiceId)) throw new Error('El ID proporcionado no tiene el formato válido');
          const invoiceData = { invoiceId, year, month};
          const createdInvoice = await createInvoicesService(invoiceData);
          createdInvoices.push(createdInvoice);
        } catch (error) {
          createdInvoices.push({ error: error.message });
        } finally {
          index++;
          await processNextInvoice();
        }
      } else {
        const successInvoices = createdInvoices.filter(invoice => !invoice.error);
        const errorMessages = createdInvoices.filter(invoice => invoice.error).map(invoice => invoice.error);
        if (errorMessages.length > 0) {
          return res.status(400).json({ success: false, errors: errorMessages });
        }
        return res.status(200).json({ success: true, response: successInvoices, message: 'Facturas creadas con éxito' });
      }
    };
    await processNextInvoice();
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
    res.json({ success: false, error: error.message });
  }
};

export const getInvoicesByUserController = async (req, res) => {
  try {
    const id = req.user.rol === 'admin' ? req.params.id : req.user.id;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('El ID proporcionado no tiene el formato válido');
    if (hasEmptyField(id)) throw new Error('Ups...parece que los datos no son correctos');
    const invoicesByUser = await getInvoicesByUserService(id);
    return res.status(200).json({succsess: true, responde: invoicesByUser});
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const getInvoicesController = async (req, res) => {
    const invoices = await getInvoicesService({});
    return res.status(200).send({ success: true, response: invoices });
};