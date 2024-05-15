import mongoose from "mongoose";
import { createUserService, userValidationService, loginService, forgotPassService, passValidationService, validateTokenService } from "../services/user_auth.service.js";
import { hasEmptyField, hasAllFields, isEmail, hasOnlyLetters, hasPassFormat } from "../utils/validation.js";
import { fieldsByController } from '../utils/fieldsByController.js';

export const createUserController = async (req, res) => {
  try {
    const { userName, password, firstName, lastName } = req.body;
    if ((!hasAllFields(req.body, fieldsByController.createUserAuthController))
      || (hasEmptyField(req.body))
      || (!isEmail(userName))
      || (!hasOnlyLetters({firstName, lastName}))
      || (!hasPassFormat(password))
    ) throw new Error('Ups...hay datos incorrectos');
    const { id, userNameCreated } = await createUserService({ userName, password, firstName, lastName });
    return res.status(201).json({ success: true, response: { id, userName: userNameCreated }, message: 'Usuario creado con éxito' });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const userValidationController = async (req, res) => {
  try {
    const { userId, userName } = req.body;
    if (!userId || !userName) throw new Error('Ups...parece que los datos no coinciden');
    if (!mongoose.Types.ObjectId.isValid(userId)) throw new Error('El ID proporcionado no tiene el formato válido');
    if ((!hasAllFields({ userId, userName }, fieldsByController.userValidationController))
      || (hasEmptyField(userName))
      || (!isEmail(userName))
    ) throw new Error('Ups...hay datos incorrectos');
    const success = await userValidationService(userId, userName);
    return res.status(200).json({ success: true, message: 'Correo electrónico validado correctamente' });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) throw new Error('Usuario y contraseña son obligatorios');
    if (!hasAllFields(req.body, fieldsByController.loginController)
      || hasEmptyField(req.body)
      || !isEmail(userName)
      || !hasPassFormat(password)
  ) throw new Error('Ups... Algunos datos incorrectos');
    const {userData, access_token} = await loginService(userName, password);
    return res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', userData, access_token });

  } catch (error) {
    res.json({ success: false, message: 'El inicio de sesión no pudo ser completado', error: error.message });
  }
};

export const validateToken = async (req, res) => {
  try {
    const { userName } = req.user;
    const user = await validateTokenService (userName) 
    return res.json({ success: true, response: user })
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const forgotPassController = async (req, res) => {
  try {
    const { userName } = req.body;
    if (hasEmptyField(userName)
    || !hasAllFields(req.body, fieldsByController.forgotPassController)
    || !isEmail(userName)
  ) throw new Error('Tu e-mail es obligatorio debe ser un formato válido');
    const { email } = await forgotPassService(userName);
    return res.status(200).json({ success: true, response: `Se envió un e-maail a ${userName} para confirmar tu password` });
  } catch (error) {
    res.json({ success: false, message: 'El cambio de tu password no pudo ser completado', error: error.message });
  }
};

export const passValidationController = async (req, res) => {
  try {
    const { userName, password, code } = req.body;
    if (!hasAllFields(req.body, fieldsByController.passValidationController)
      || hasEmptyField(req.body)
      || !isEmail(userName)
      || !hasPassFormat(password)
      || !code
  ) throw new Error('Ups... Algunos datos incorrectos');
    const success = await passValidationService(userName, password, code);
    return  res.status(200).json({ success: true, message: 'La contraseña se modificó correctamente' });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};