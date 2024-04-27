import { PlanModel } from "../database/models/plan.schema.js";


export const getPlansService = async () => {
  try {
    const plans = await PlanModel.find({});
    return plans;
  } catch (error) {
    throw error;
  };
};

export const updatePriceService = async (id, price) => {
  try {
    const isPlan = await PlanModel.findById(id).select('price');
    if (!isPlan) throw new Error('Plan inexistente');
    const updatedPlan = await PlanModel.findByIdAndUpdate(id, { price }, { new: true}).select('price');
    return updatedPlan;
  } catch (error) {
    throw error;
  };
};