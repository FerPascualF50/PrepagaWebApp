import { hasEmptyField, hasAllFields } from "../utils/validation.js";

export const createInvoicebyClientController = async (req, res) => {
  try {
    const { userName, password, firstName, lastName } = req.body;
    if ((!hasAllFields(req.body)) || (hasEmptyField(req.body))) {
      res.status(400).json({ success: false, error: 'Ups...parece que los datos no son correctos' });
    }
    const { id, userNameCreated } = await createUserAuthService({ userName, password, firstName, lastName });
    return res.status(201).json({ success: true, response: {id,  userName: userNameCreated }, message: 'Usuario creado con éxito' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};