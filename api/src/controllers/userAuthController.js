import { createUserAuth, userAuth, updateUserValidation  } from "../services/userAuthService.js";
import { hasEmptyField, hasAllFields } from "../utils/validation.js";

export const registerUser = async (req, res) => {
  try {
    const { userName, password, firstName, lastName } = req.body;
    
    if (!hasAllFields(req.body)) {
      return res.status(400).json({ success: false, error: 'Ups...parece que los datos no son correctos' });
    }
    
    if (hasEmptyField(req.body)) {
      return res.status(400).json({ success: false, error: 'Todos los campos son obligatorios' });
    }
    
    const { id, userNameCreated } = await createUserAuth({ userName, password, firstName, lastName });

    res.status(201).json({ success: true, response: {id,  userName: userNameCreated }, message: 'Usuario creado con éxito' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const sendValidationEmailController = async (req, res) => {
  try {
    const { userId } = req.params._id;

    const user = await UserModel.findById(userId);

    if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    
    const emailSent = await sendValidationEmailService(userId, user.confirmationCode);

    if (emailSent) {
      return res.status(200).json({ success: true, message: 'Correo electrónico de validación enviado correctamente' });
    } else {
      return res.status(404).json({ success: false, message: 'Error al enviar el correo electrónico de validación' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error al validar el correo electrónico', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ success: false, message: 'El nombre de usuario y la contraseña son obligatorios' });
    }

    const access_token = await userAuth(userName, password);
    
    res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', access_token });
  } catch (error) {
    res.status(400).json({ success: false, message: 'El inicio de sesión no pudo ser completado correctamente', error: error.message });
  }
};


export const validateEmail = async (req, res) => {
  try {
    const { userId } = req.params;
    const { userName } = req.query;

    const success = await updateUserValidation(userId, userName);
    
    if (success) {
      return res.status(200).json({ success: true, message: 'Correo electrónico validado correctamente' });
    } else {
      return res.status(404).json({ success: false, message: 'Error al validar el correo electrónico' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error al validar el correo electrónico catch', error: error.message });
  }
};