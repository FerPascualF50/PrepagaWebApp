import { CenterModel } from '../database/models/center.schema.js '


export const getCentersService = async () => {
  try {
    const centers = await CenterModel.find({});
    return centers;
  } catch (error) {
    throw error;
  };
};