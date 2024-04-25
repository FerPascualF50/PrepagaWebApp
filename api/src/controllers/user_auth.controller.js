import mongoose from "mongoose";
import { createUserAuthService, userValidationService, userLoginService, forgotPassService, passValidationService, changePassService } from "../services/user_auth.service.js";
import { hasEmptyField, hasAllFields, isEmail } from "../utils/validation.js";
import { fieldsByController } from '../utils/fieldsByController.js';

export const createUserAuthController = async (req, res) => {
  try {
    const { userName, password, firstName, lastName } = req.body;
    if ((!hasAllFields(req.body, fieldsByController.createUserAuthController))
      || (hasEmptyField(req.body))
      || (!isEmail(userName))
      || (password.length < 8)
    ) throw new Error('Ups...hay datos incorrectos');
    const { id, userNameCreated } = await createUserAuthService({ userName, password, firstName, lastName });
    return res.status(201).json({ success: true, response: { id, userName: userNameCreated }, message: 'Usuario creado con éxito' });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const userValidationController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { userName } = req.query;
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

export const userLoginController = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) throw new Error('Usuario y contraseña son obligatorios');
    if (!hasAllFields(req.body, fieldsByController.userLoginController)
      || hasEmptyField(req.body)
      || !isEmail(userName)
      || password.length < 8
  ) throw new Error('Ups... Algunos datos incorrectos');
    const access_token = await userLoginService(userName, password);
    return res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', access_token });
  } catch (error) {
    res.json({ success: false, message: 'El inicio de sesión no pudo ser completado', error: error.message });
  }
};

export const forgotPassController = async (req, res) => {
  try {
    const { userName } = req.body;
    if (hasEmptyField(req.body)
    || hasAllFields(req.body, fieldsByController.forgotPassController)
    || !isEmail(userName)
  ) throw new Error('Tu e-mail es obligatorio y válido');
    const { email } = await forgotPassService(userName);
    return res.status(200).json({ success: true, response: `Se envio un e-maail a ${userName} para confirmar tu password` });
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
      || password.length < 8
      || !code
  ) throw new Error('Ups... Algunos datos incorrectos');
    const success = await passValidationService(userName, password, code);
    return  res.status(200).json({ success: true, message: 'La contraseña se modificó correctamente' });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const changePassController = async (req, res) => {
  try {
    const { id, userName } = req.user;
    const { oldPass, newPass } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('El ID proporcionado no tiene el formato válido');
    if (!hasAllFields(req.body, fieldsByController.changePassController)
      || hasEmptyField(req.body, req.user)
      || !isEmail(userName)
      || (oldPass.length && newPass.length) < 8
  ) throw new Error('Ups... Algunos datos incorrectos');
    const success = await changePassService(userName, oldPass, newPass);
    return res.status(200).json({ success: true, message: 'La contraseña se modificó correctamente' });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};