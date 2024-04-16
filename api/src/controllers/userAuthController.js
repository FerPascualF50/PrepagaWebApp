import { createUserAndAuth, userAuth, sendValidationEmailService, updateUserValidation  } from "../services/userAuthService.js";

export const registerUser = async (req, res) => {
  try {
    const { userName, password, firstName, lastName } = req.body;

    if (!(userName && password && firstName && lastName)) {
      return res.status(400).send({ error: 'Todos los campos son obligatorios' });
    }

    const access_token = await createUserAndAuth({ userName, password, firstName, lastName });
    res.status(201).send({ access_token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName) {
      return res.status(400).send({ success: false, message: 'El nombre de usuario es obligatorio' });
    }

    if (!password) {
      return res.status(400).send({ success: false, message: 'La contraseña es obligatoria' });
    }

    const access_token = await userAuth(userName, password);
    res.status(200).send({ success: true, message: 'Inicio de sesión exitoso', access_token });
  } catch (error) {
    res.status(400).send({ success: false, message: 'Ups... El inicio de sesión no pudo ser completado correctamente', data: { error: error.message } });
  }
};

export const sendValidationEmailController = async (req, res) => {
  try {
    const { userId } = req.params._id;

    const user = await UserAuthModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    const result = await sendValidationEmailService(userId);

    if (result) {
      return res.status(200).json({ success: true, message: 'Correo electrónico de validación enviado correctamente' });
    } else {
      return res.status(404).json({ success: false, message: 'Error al enviar el correo electrónico de validación' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error al validar el correo electrónico', error: error.message });
  }
};

export const validateEmail = async (req, res) => {
  try {
    const { userId } = req.params;

    const success = await updateUserValidation(userId);

    if (success) {
      return res.status(200).json({ success: true, message: 'Correo electrónico validado correctamente' });
    } else {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error al validar el correo electrónico', error: error.message });
  }
};