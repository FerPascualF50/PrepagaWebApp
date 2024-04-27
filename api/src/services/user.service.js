import bcrypt from "bcrypt";
import { UserModel } from "../database/models/user.schema.js";
import { PlanModel } from "../database/models/plan.schema.js";
import { InvoiceModel } from "../database/models/invoice.schema.js";

export const updateUserService = async (id, { firstName, lastName, cellphone, address, taxId, plan }) => {
  try {
    const isPlan = await PlanModel.findById(plan);
    const isValidUser = await UserModel.findOne({ _id: id, userValidated: true }).select('userValidated -_id');
    if (!isValidUser) throw new Error('Revisa tu e-mail y valida tu cuenta')
    if (!isPlan) throw new Error('Plan inexistente');
    const updatedUser = await UserModel.findByIdAndUpdate(id, { firstName, lastName, cellphone, address, taxId, plan }, { new: true});
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
    const payload = {
      id: deletedUser._id,
      firstName: deletedUser.firstName,
      lastName: deletedUser.lastName,
    };
    return payload
  } catch (error) {
    throw error;
  };
};

export const updatePassService = async (id, oldPass, newPass) => {
  try {
     UserModel.schema.path("password").select(true);
     const userInfo = await UserModel.findById(id);
     if(!userInfo) throw new Error('Usuario inexistente')
     const isOldPass = await bcrypt.compare(oldPass, userInfo.password);
     if (!isOldPass) throw new Error('Ups... algo pasó');
     const hashedPassword = await bcrypt.hash(newPass, 10);
     userInfo.password = hashedPassword
     await userInfo.save();
     UserModel.schema.path("password").select(false);
     return true;
  } catch (error) {
   throw error;
  } 
 };

 export const updateRolService = async (id, userId, rol) => {
  try {
    const userAdmin =  await UserModel.findById(id).select('rol')
    if(!userAdmin) throw new Error('Usuario admin inexistente');
    const userInfo = await UserModel.findById(userId).select('rol userValidated');
    if(!userInfo || !userInfo.userValidated) throw new Error('Usuario inexistente o no validado');
    if(userInfo.rol === 'admin') throw new Error('Usuario que intentas modificar ya es admin');
    userInfo.rol = rol;
    await userInfo.save()
  } catch (error) {
   throw error;
  }
 };