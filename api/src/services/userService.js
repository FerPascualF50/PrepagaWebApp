import { UserModel } from "../database/models/userSchema.js";

export const getAllUsersService = async () => {
  try {
    const users = await UserModel.find({});
    return users;
  } catch (error) {
    throw new Error (error);
  };
};

export const userByIdService = async (userData) => {
  try {
    const user = await UserModel.findOne(userData); 
    return user;
  } catch (error) {
    throw new Error(error);
  };
};

export const updateUserService = async (userDataId, updatedData) => {
  try {
    const updatedUserAuth = await UserAuthModel.findOneAndUpdate(userDataId, updatedData, { new: true });

    const user = await UserModel.findOneAndUpdate({ userAuth: userDataId }, updatedData, { new: true });

    return user;
  } catch (error) {
    throw new Error(error);
  };
};

export const deleteUserService = async (userData) => {
  try {
    const deletedUser = await UserModel.findOneAndDelete(userData);
    return deletedUser;
  } catch (error) {
    throw new Error(error);
  };
};