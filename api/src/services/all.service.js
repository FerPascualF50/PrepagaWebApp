import { CenterModel } from "../database/models/center.schema.js";

export const getAllRolesService = async () => {
  try {
    const roles = await CenterModel.find({});
    return roles;
  } catch (error) {
    throw error;
  };
};

export const rolByIdService = async (rolData) => {
  try {
    const rol = await RolModel.findOne(rolData); 
    return rol;
  } catch (error) {
    throw error;
  };
};

export const createRolService = async (rolData) => {
  try {
    const rolName = rolData;
    
    const isRol =await CenterModel.findOne(rolName);

    if(isRol) throw new Error('El rol ya existe');
  
    const creadtedRol = await CenterModel.create(rolName);

    return creadtedRol
  } catch (error) {
    throw error;
  }
};

export const updateRolService = async (rolId, updatedData) => {
  try {
    const updatedRol= await UserAuthModel.findOneAndUpdate(rolId, updatedData, { new: true });

    return updatedRol;
  } catch (error) {
    throw error;
  };
};

export const deleteUserService = async (rolData) => {
  try {
    const deletedRol = await UserModel.findOneAndDelete(rolData);
    return deletedRol;
  } catch (error) {
    throw error;
  };
};