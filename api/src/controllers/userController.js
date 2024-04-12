import { getAllUsersService, userByIdService, createUserService, updateUserService, deleteUserService } from "../services/userService.js";

export const getAllUsers = async (req, res) => {
  const users = await getAllUsersService();
  res.status(200).send(users);
};

export const userById = async (req, res) => {
  const user = await userByIdService({ _id: req.params.id });
  res.status(200).send(user);
};

export const createUser = async (req, res) => {
  const createdUser = await createUserService(req.body);
  res.status(201).send(createdUser);
};

export const updateUser = async (req, res) => {
  const updatedUser = await updateUserService(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  res.status(200).send(updatedUser);
};

export const deleteUser = async (req, res) => {
  const deletedUser = await deleteUserService({
    _id: req.params.id,
  });
  res.status(200).send(deletedUser);
};