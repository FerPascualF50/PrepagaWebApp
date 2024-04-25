import { UserModel } from "../database/models/user.schema.js";
import { PlanModel } from "../database/models/plan.schema.js";
import { InvoiceModel } from "../database/models/invoice.schema.js";
import { UserAuthModel } from "../database/models/user_auth.schema.js";

export const updateUserService = async (id, { firstName, lastName, cellphone, address, taxId, plan }) => {
  try {
    const isPlan = await PlanModel.findById(plan);
    const isValidUser = await UserModel.findOne({ _id: id, userValidated: true }).select('userValidated -_id');
    if (!isValidUser) throw new Error('Revisa tu e-mail y valida tu cuenta')
    if (!plan) throw new Error('Plan inexistente');
    const updatedUser = await UserModel.findByIdAndUpdate(id, { firstName, lastName, cellphone, address, taxId, plan: isPlan._id }, { new: true });
    return updatedUser;
  } catch (error) {
    throw error;
  };
};

export const getUserByIdService = async (id) => {
  try {
    const isUser = await UserModel.findById(id);
    if (!isUser) throw new Error('Usuario inexistente');
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
    const isUser = await UserModel.findById(id).select('_id');
    if (!isUser) throw new Error('Usuario inexistente');
    const pendingInvoices = await InvoiceModel.find({
      client: id,
      statusPayment: 'pending'
    });
    if (pendingInvoices.length > 0) throw new Error('El usuario tiene facturas pendientes de pago');
    const deletedUser = await UserModel.findByIdAndDelete(id);
    const deletedUserAuth = await UserAuthModel.findByIdAndDelete(id);
    const payload = {
      id: deletedUserAuth._id,
      firstName: deletedUser.firstName,
      lastName: deletedUser.lastName,
    };
    return payload
  } catch (error) {
    throw error;
  };
};