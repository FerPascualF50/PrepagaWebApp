import { createUserAuthService, userValidationService, userLoginService, forgotPassService, passValidationService, changePassService } from "../services/user_auth.service.js";
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

export const forgotPassController = async (req, res) => {
  try {
    const { userName } = req.body;
    if (hasEmptyField(req.body)) {
      res.status(400).json({ success: false, message: 'Tu e-mail es obligatorio'});
    }
    const { email } = await forgotPassService( userName );

    res.status(200).json({ success: true, response: `Se envio un e-maail a ${userName} para confirmar tu password`});
  } catch (error) {
    res.status(400).json({ success: false, message: 'El cambio de tu password no pudo ser completado', error: error.message });
  }
};

export const passValidationController = async (req, res) => {
  try {
    const { userName, password, code } = req.body;
    if (hasEmptyField(req.body)) {
      return res.status(400).json({ success: false, error: 'Ups...parece que los datos no coinciden' });
    }
    const success = await passValidationService(userName, password, code);
    if (success) {
      res.status(200).json({ success: true, message: 'La contraseña se modificó correctamente' });
    } else {
      res.status(404).json({ success: false, message: 'Error al cambiar contraseña' });
    }
  } catch (error) {
    res.status(500).json({ success: false,  error: error.message });
  }
};

export const changePassController = async (req, res) => {
  try {
    const { userName ,oldPass, newPass }  = req.body;
    if(hasEmptyField(req.body)) {
      return res.status(400).json( {success: false, error: 'Ups... parece algún dato no esta bien'});
    }
    const success = await changePassService (userName, oldPass, newPass);
    if (success) {
      res.status(200).json({ success: true, message: 'La contraseña se modificó correctamente' });
    } else {
      res.status(404).json({ success: false, message: 'Error al modificar contraseña' });
    }
  } catch (error) {
    res.status(500).json({ success: false,  error: error.message });
  }
};