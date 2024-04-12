import { userModel } from "../database/models/userModel.js";

export const getAllUsersService = async () => {
    const users = await userModel.name;
    return users
  };
  
  export const userByIdService = async () => {
    const user = await userModel.findOne({ _id: req.params.id });
  };
  
  export const createUserService = async () => {
    const createdUser = await userModel.create(req.body);
  };
  
  export const updateUserService = async () => {
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
  };
  
  export const deleteUserService = async () => {
    const deletedUser = await userModel.findOneAndDelete({
      _id: req.params.id,
    });
  };