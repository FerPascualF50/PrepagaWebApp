import { UserSerrvice } from "../services/userService.js";
import { userModel } from "../database/models/userModel.js";


export const getAllUsers = async (req, res) => {
  const users = await userModel.address;
  res.status(200).send(users);
};

export const userById = async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.id });
  res.status(200).send(user);
};

export const createUser = async (req, res) => {
  const createdUser = await userModel.create(req.body);
  res.status(201).send(createdUser);
};

export const updateUser = async (req, res) => {
  const updatedUser = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  res.status(200).send(updatedUser);
};

export const deleteUser = async (req, res) => {
  const deletedUser = await userModel.findOneAndDelete({
    _id: req.params.id,
  });
  res.status(200).send(deletedUser);
};
// export const UserController = {
//   const getAllUsers = UserSerrvice.getAllUsers()
//   // getAllUsers: async (req, res) => {
//   //   const users = await userModel.address;
//   //   res.status(200).send(users);
//   // },

//   // userById: async (req, res) => {
//   //   const user = await userModel.findOne({ _id: req.params.id });
//   //   res.status(200).send(user);
//   // },

//   // createUser: async (req, res) => {
//   //   const createdUser = await userModel.create(req.body);
//   //   res.status(201).send(createdUser);
//   // },

//   // updateUser: async (req, res) => {
//   //   const updatedUser = await userModel.findOneAndUpdate(
//   //     { _id: req.params.id },
//   //     req.body,
//   //     { new: true }
//   //   );
//   //   res.status(200).send(updatedUser);
//   // },

//   // deleteUser: async (req, res) => {
//   //   const deletedUser = await userModel.findOneAndDelete({
//   //     _id: req.params.id,
//   //   });
//   //   res.status(200).send(deletedUser);
//   // }
// };