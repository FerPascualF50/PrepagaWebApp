import { createUserAndAuth, userAuth } from "../services/userAuthService.js";

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