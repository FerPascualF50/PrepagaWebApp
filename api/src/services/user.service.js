import { UserModel } from "../database/models/user.schema.js";
import { PlanModel } from "../database/models/plan.schema.js";
import { InvoiceModel } from "../database/models/invoice.schema.js";

export const updateUserToClientService = async (id, {firstName, lastName,  cellphone,  address,  taxId,  rol, plan }) => {
  try {
    const isPlan = await PlanModel.findById(plan);
    if(!plan) throw new Error('Plan inexistente');
    const updatedUser = await UserModel.findByIdAndUpdate(id, { firstName, lastName, cellphone, address, taxId, rol, plan: isPlan._id }, { new: true });
    if(!updatedUser) throw new Error('Usuario inexistente');
    if (!updatedUser.userValidated) throw new Error ('Revisa tu e-mail y valida tu cuenta')
    return updatedUser;
  } catch (error) {
    throw error;
  };
};

export const getUserByIddService = async (id) => {
  try {
    const isUser = await UserModel.findById(id);
    if(!isUser) throw new Error('Usuario inexistente');
    return isUser;
  } catch (error) {
    throw error;
  };
};

export const getAllUsersService = async () => {
  try {
    const users = await UserModel.find({});
    return users;
  } catch (error) {
    throw error;
  };
};

export const deleteUserService = async (id) => {
  try {
    const isUser = await UserModel.findById(id);
    if(!isUser) throw new Error('Usuario inexistente');
    const pendingInvoices = await InvoiceModel.find({
      client: id,
      statusPayment: 'pending'
    });
    if (pendingInvoices.length > 0) throw new Error('El usuario tiene facturas pendientes de pago');
    const deletedUser = await UserModel.findByIdAndUpdate(id, { deletedUser: true}, { new: true });
    return deletedUser;
  } catch (error) {
    throw error;
  };
};