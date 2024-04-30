import { InvoiceModel } from "../database/models/invoice.schema.js";
import { PlanModel } from "../database/models/plan.schema.js";
import { UserModel } from "../database/models/user.schema.js";
import { createPDFInvoiceService} from "../services/invoice_pdf.service.js";

export const filterIdsWithoutInvoiceService = async (year, month, ids) => {
  try {
    const filteredIds = await Promise.all(ids.map(async (clientId) => {
      const existInvoice = await InvoiceModel.countDocuments({
        client: clientId,
        "period.year": year,
        "period.month": month,
        deleted: { $ne: true }
      });
      return existInvoice === 0 ? clientId : null;
    }));
    return filteredIds.filter(clientId => clientId !== null);
  } catch (error) {
    throw error;
  }
};

export const createInvoicesService = async (data) => {
  try {
    const { clientId, number, year, month } = data;
    const isUser = await UserModel.findOne({ _id: clientId, plan: { $exists: true } }).exec();
    if (!isUser) throw new Error("El usuario no es cliente");
    const planData = await PlanModel.findById(isUser.plan).select('name price');
    const createdInvoice = await InvoiceModel.create({
      number: number,
      period: { year, month },
      client: clientId,
      descriptionInvoice: planData.name,
      price: planData.price,
    });
    await createPDFInvoiceService(  createdInvoice._id );
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

export const getClientsByPeriodService = async(year, month) => {
  try {
      const clients = await UserModel.find({ userValidated: true, plan: { $exists: true, $ne: null } }).select('_id firstName lastName userName');
      const invoicesPromises = clients.map(async(client) => {
      const existInvoice = await InvoiceModel.countDocuments({
        client: client._id,
        "period.year": year,
        "period.month": month,
        deleted: { $ne: true }
      });
      if (existInvoice === 0) return { _id: client._id, firstName: client.firstName, lastName: client.lastName, userName: client.userName }; 
      return null;
      });
      const filteredClients = (await Promise.all(invoicesPromises)).filter(client => client !== null);
      return filteredClients;
  } catch (error) {
      throw error;
  }
};