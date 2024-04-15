import { getAllUsersService,  userByIdService,  updateUserService, deleteUserService } from "../services/userService.js";

export const getAllUsers = async (req, res) => {
  const users = await getAllUsersService({});
  res.status(200).send({ success: true, data: users });
};

export const userById = async (req, res) => {
  try {
    const userData = { _id: req.params.id };
    const user = await userByIdService(userData);
    res.status(200).send({ success: true, data: user });
  } catch (error) {
    res.status(400).send({ success: false, data: { error: error.message } });
  };
};

export const updateUser = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const userId = req.params.id;

    if (!(firstName && lastName)) {
      return res.status(400).send({ success: false, error: `Falta uno o más campos requeridos`});
    }

    const updatedUser = await updateUserService(userId, { firstName, lastName });
    res.status(200).send({success: true, data: updatedUser, message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

export const deleteUser = async (req, res) => {
  try {
    const userData = { _id: req.params.id };
    const deletedUser = await deleteUserService(userData);
    res.status(200).send({ success: true,  data: deletedUser, message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(400).send({  success: false, data: { error: error.message }, message: "Ups... El usuario no pudo ser eliminado correctamente" });
  };
};