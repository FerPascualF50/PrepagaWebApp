import { createUserAuthService, userValidationService, userLoginService  } from "../services/user_auth.service.js";
import { hasEmptyField, hasAllFields } from "../utils/validation.js";

export const createUserAuthController = async (req, res) => {
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

export const userValidationController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { userName } = req.query;
    if ((!userId) || (!userName)) {
      return res.status(400).json({ success: false, error: 'Ups...parece que los datos no coinciden' });
    }
    const success = await userValidationService(userId, userName);
    if (success) {
      res.status(200).json({ success: true, message: 'Correo electrónico validado correctamente' });
    } else {
      res.status(404).json({ success: false, message: 'Error al validar el e-mail' });
    }
  } catch (error) {
    res.status(500).json({ success: false,  error: error.message });
  }
};

export const userLoginController = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      res.status(400).json({ success: false, message: 'El nombre de usuario y la contraseña son obligatorios' });
    }
    const access_token = await userLoginService(userName, password);
    res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', access_token });
  } catch (error) {
    res.status(400).json({ success: false, message: 'El inicio de sesión no pudo ser completado', error: error.message });
  }
};