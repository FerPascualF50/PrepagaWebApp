import mongoose from "mongoose";
import { getPlansService, updatePriceService } from "../services/plan.service.js";
import { hasEmptyField, hasAllFields, hasStringValue } from "../utils/validation.js";
import { fieldsByController } from "../utils/fieldsByController.js"

export const getPlansController = async (req, res) => {
  const plans = await getPlansService({});
  return res.status(200).send({ success: true, response: plans });
};

export const updatePriceController = async (req, res) => {
  try {
    const { id } = req.params
    const { price } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('El ID del plan proporcionado no tiene el formato válido');
    if (hasEmptyField(price, id)) throw new Error('El precio es obligatorio');
    if (hasStringValue(price)) throw new Error('El campo precio debe ser numeros');
    if (!hasAllFields(req.body, fieldsByController.updatePriceController)) throw new Error('Ups... algo falló');
    const updatedPlan = await updatePriceService(id, price);
    return res.status(201).send({ success: true, response: updatedPlan, message: 'Plan actualizado correctamente' });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};