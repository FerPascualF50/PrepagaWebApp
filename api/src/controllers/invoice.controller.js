import mongoose from "mongoose";
import  { InvoiceModel } from "../database/models/invoice.schema.js"
import { hasEmptyField, hasStringValue } from "../utils/validation.js";
import { createInvoicesService, deleteInvoiceService, getInvoicesByUserService, getInvoicesService, getClientsByPeriodService } from "../services/invoice.service.js";
import { filterIdsWithoutInvoiceService } from '../services/invoice.service.js';

export const createInvoicesController = async (req, res) => {
  try {
    const { year, month, ids } = req.body;
    if (hasStringValue({year, month})) throw new Error('Los datos de año y mes deben ser números');
    if (month > 12 || month < 1) throw new Error('El mes seleccionado no es válido');
    if (year > 2025 || year < 2024) throw new Error('El año seleccionado no es válido');
    const uniqueIds = new Set(ids);
    if (uniqueIds.size !== ids.length) throw new Error('Los ID de usuarios proporcionados no deberian repetirse y ser unicos, por favor contacta al administrador');
    const filteredIds = await filterIdsWithoutInvoiceService(year, month, ids);
    if(!filteredIds.length) throw new Error('Los usuarios ya possen facturas emitidas para el periodo que intentas facturar, verifica el periodo e intenta nuevamente')
    const highestInvoice = await InvoiceModel.findOne({}, {}, { sort: { 'number': -1 } });
  let nextInvoiceNumber = highestInvoice ? highestInvoice.number + 1 : 1;
  const createdInvoices = await Promise.all(filteredIds.map(async (clientId) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(clientId)) throw new Error('El ID proporcionado no tiene el formato válido');
      const invoiceData = { clientId, number: nextInvoiceNumber++, year, month };
      return await createInvoicesService(invoiceData);
    } catch (error) {
      return { error: error.message };
    }
  }));
  const successInvoices = createdInvoices.filter(invoice => !invoice.error);
  const errorMessages = createdInvoices.filter(invoice => invoice.error).map(invoice => invoice.error);
  if (errorMessages.length > 0) return res.json({ success: false, errors: errorMessages });
  res.json({ success: true, response: successInvoices, message: 'Facturas creadas con éxito' });
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

export const getClientsByPeriodController = async (req, res) => {
  try {
    const { year, month } = req.body
    if(hasEmptyField(year, month)) throw new Error('El año y el mes no pueden estar vacío.')
    if (hasStringValue({year, month})) throw new Error('El año y mes deben ser números');
    if (month > 12 || month < 1) throw new Error('El mes seleccionado no es válido');
    if (year > 2025 || year < 2024) throw new Error('El año seleccionado no es válido');
    const clients = await getClientsByPeriodService( year, month)
    return res.status(200).send({ success: true, response: clients });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};