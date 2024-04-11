import { userModel } from "../database/models/userModel.js";

export const UserController = {
  getAllUsers: async (req, res) => {
    const users = await userModel.findAll({});
    res.status(200).send(users);
  },

  userById: async (req, res) => {
    const user = await userModel.findOne({ _id: req.params.id });
    res.status(200).send(user);
  },

  createUser: async (req, res) => {
    const createdUser = await userModel.create(req.body);
    res.status(201).send(createdUser);
  },

  updateUser: async (req, res) => {
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).send(updatedUser);
  },

  deleteUser: async (req, res) => {
    const deletedUser = await userModel.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).send(deletedUser);
  }
};