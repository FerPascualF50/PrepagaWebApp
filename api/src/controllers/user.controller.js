import mongoose from "mongoose";
import { getAllUsersService, getUserByIddService, updateUserToClientService, deleteUserService } from "../services/user.service.js";
import { hasEmptyField, hasStringValue } from "../utils/validation.js";

export const updateUserToClientControler = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, cellphone, address, taxId, rol, plan } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('El ID proporcionado no tiene el formato válido');
    if (hasEmptyField(id, firstName, lastName, address, rol, plan)) return res.status(400).send({ success: false, error: `Falta uno o más campos requeridos` });
    if (hasStringValue({cellphone, taxId}))  return res.status(400).send({ success: false, error: `El campo celular y CUIT deben ser numeros` });
    if (cellphone.toString().length != 10 || taxId.toString().length != 11)  return res.status(400).send({ success: false, error: `El campo celular o CUIT no tienen la logitud correcta` });
    const updateUserToClient = await updateUserToClientService(id, { firstName, lastName, cellphone, address, taxId, rol, plan });
    res.status(200).send({ success: true, data: updateUserToClient, message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params ;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('El ID proporcionado no tiene el formato válido');
    const user = await getUserByIddService(id);
    res.status(200).send({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllUsersController = async (req, res) => {
  const users = await getAllUsersService({});
  res.status(200).send({ success: true, data: users });
};

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params ;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('El ID proporcionado no tiene el formato válido');
    const deletedUser = await deleteUserService(id);
    res.status(200).send({ success: true, data: deletedUser, message: "Usuario eliminado correctamente"});
  } catch (error) {
    res.status(500).send({ success: false, error: error.message, message: 'Ups... El usuario no pudo ser eliminado correctamente'});
  }
};