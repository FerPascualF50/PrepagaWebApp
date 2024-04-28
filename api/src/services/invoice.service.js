import { InvoiceModel } from "../database/models/invoice.schema.js";
import { UserModel } from "../database/models/user.schema.js";

export const createInvoiceByClientService = async (invoiceData) => {
  try {
    const { id, year, month, descriptionInvoice, price } = invoiceData;
    const isUser = await UserModel.findById(id);
    if (!isUser) throw new Error("El usuario no es cliente");
    const existInvoice = await InvoiceModel.countDocuments({
      client: id,
      "period.year": year,
      "period.month": month,
      deleted: false
    });
    if (existInvoice > 0) throw new Error("El comprobante ya existe para el usuario");
    const createdInvoice = await InvoiceModel.create({
      number: await InvoiceModel.countDocuments() + 1,
      period: { year: year, month: month },
      client: id,
      descriptionInvoice: descriptionInvoice,
      price: price,
    });
    return createdInvoice;
  } catch (error) {
    throw error;
  }
};

export const deleteInvoiceService = async (id) => {
  try {
    const isInvoice = await InvoiceModel.findById(id).where('deleted');
    if (!isInvoice || isInvoice.deleted) throw new Error("El comprobante no existe");
    const deletedInvoice = await InvoiceModel.findByIdAndUpdate(id, { deleted: true }, { new: true });
    return deletedInvoice;
  } catch (error) {
    throw error;
  }
};

export const getInvoicesByUserService = async (idClient, page = 2) => { //PAGE pasr por parametro del front
  try {
    const perPage = 12;
    const skip = (page - 1) * perPage;
    const invoicesbyUser = await InvoiceModel.find({ client: idClient, deleted: false })
      .sort({ "period.year": -1, "period.month": -1 })
      .skip(skip)
      .limit(perPage);
    if(!invoicesbyUser ||invoicesbyUser.length === 0) throw new Error('Aun no tiene comprobantes');
    return invoicesbyUser;
  } catch (error) {
  throw error;
  }
};

export const getInvoicesService = async (page = 2) => { //PAGE pasr por parametro del front
  try {
    const perPage = 12;
    const skip = (page - 1) * perPage;
    const invoices = await InvoiceModel.find({ deleted: false })
      .sort({ "period.year": -1, "period.month": -1 })
      .skip(skip)
      .limit(perPage);
    if(!invoices ||invoices.length === 0) throw new Error('Aun no tiene comprobantes');
    return invoices;
  } catch (error) {
  throw error;
  }
};