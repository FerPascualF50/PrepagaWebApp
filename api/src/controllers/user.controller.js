import mongoose from "mongoose";
import { getAllUsersService, getUserByIdService, updateUserService, deleteUserService, changePassService } from "../services/user.service.js";
import { hasEmptyField, hasAllFields, hasStringValue } from "../utils/validation.js";
import { fieldsByController } from "../utils/fieldsByController.js"

export const updateUserToClientControler = async (req, res) => {
  try {
    const { id } = req.user;
    const { firstName, lastName, cellphone, address, taxId, plan } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('El ID proporcionado no tiene el formato válido');
    if (hasEmptyField(id, firstName, lastName, address, plan)) throw new Error('Falta uno o más campos requeridos');
    if (hasStringValue({cellphone, taxId}))  throw new Error('El campo celular y CUIT deben ser numeros');
    if (cellphone.toString().length != 10 || taxId.toString().length != 11) throw new Error('El campo celular o CUIT no tienen la logitud correcta');
    const updateUserToClient = await updateUserService(id, { firstName, lastName, cellphone, address, taxId, plan });
    return res.status(201).send({ success: true, response: updateUserToClient, message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params ;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('El ID proporcionado no tiene el formato válido');
    const user = await getUserByIdService(id);
    return res.status(200).send({ success: true, response: user });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const getAllUsersController = async (req, res) => {
  const users = await getAllUsersService({});
  return res.status(200).send({ success: true, response: users });
};

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.user ;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('El ID proporcionado no tiene el formato válido');
    const deletedUser = await deleteUserService(id);
    return res.status(201).send({ success: true, response: deletedUser, message: "Usuario eliminado correctamente"});
  } catch (error) {
    res.json({ success: false, error: error.message, message: 'Ups... El usuario no pudo ser eliminado correctamente'});
  }
};

export const changePassController = async (req, res) => {
  try {
    const { id } = req.user;
    const { oldPass, newPass } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('El ID proporcionado no tiene el formato válido');
    if (!hasAllFields(req.body, fieldsByController.changePassController)
      || hasEmptyField(req.body, req.user)
      || (oldPass.length && newPass.length) < 8
  ) throw new Error('Ups... Algunos datos incorrectos');
    const success = await changePassService(id, oldPass, newPass);
    return res.status(200).json({ success: true, message: 'La contraseña se modificó correctamente' });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};