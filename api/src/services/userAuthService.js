import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES, USER_EMAIL, EMAIL_PASS } from "../config.js";
import nodemailer from "nodemailer";
import { UserAuthModel } from "../database/models/userAuthSchema.js";
import { UserModel } from "../database/models/userSchema.js";

export const createUserAndAuth = async (userData) => {
  try {
    const { userName, password, firstName, lastName } = userData;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUserAuth = new UserAuthModel({
      userName,
      password: hashedPassword,
    });

    const createdUserAuth = await newUserAuth.save();

    const newUser = new UserModel({
      _id: createdUserAuth._id,
      firstName,
      lastName,
    });

    const createdUser = await newUser.save();

    const emailSent = await sendValidationEmailService(newUserAuth.userName);

    // Verificar si el correo electrónico se envió correctamente
    // if (emailSent) {
    //   console.log('Correo electrónico de validación enviado correctamente.');
    // } else {
    //   console.error('Error al enviar el correo electrónico de validación.');
    // }

    const access_token = jwt.sign(
      { id: createdUserAuth._id },
      process.env.JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES,
      }
    );

    return access_token;
  } catch (error) {
    throw error.message;
  }
};

export const userAuth = async (userName, password) => {
  try {
    UserAuthModel.schema.path("password").select(true);
    const user = await UserAuthModel.findOne({ userName });
    UserAuthModel.schema.path("password").select(false);

    if (!user) {
      throw new Error("Nombre de usuario o contraseña incorrectos");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Nombre de usuario o contraseña incorrectos");
    }

    const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });

    return access_token;
  } catch (error) {
    throw error.message;
  }
};

///// envio de mail de confirmación
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: USER_EMAIL,
    pass: EMAIL_PASS,
  },
});

export const sendValidationEmailService = async (userName) => {
  try {
    const user = await UserAuthModel.findOne({ userName });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const validationLink = `http://localhost:4000/api/auth/validate-email/${user._id}`;

    await transporter.sendMail({
      from: USER_EMAIL,
      to: user.userName,
      subject: "Valida tu correo en Salud +",
      text: `Haz click en el siguiente enlace para validar tu e-mail ${validationLink}`,
      html: `
      <html>
  <head>
    <style>
      .button {
        background-color: #ff5862;
        border: none;
        color: #ffffff;
        padding: 15px 32px;
        text-align: center;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 5px;
      }
      .plus {
        color: #ff5862;
      }
      .container {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      h2 {
        color: #314080; 
        padding-bottom: 10px;
        text-align: center;
      }
      p {
        color: #314080;
        text-align: center; 
      }
    </style>
  </head>
  <body class="container">
    <div>
      <h2>¡ Gracias por registrarte en Salud <span class="plus">+ </span>!</h2>
      <p>Para confirmar tu cuenta, haz clic en el siguiente botón:</p>
      <a href="http://localhost:4000/api/auth/validate-email/${user._id}" class="button">Confirmar Cuenta</a>
    </div>
  </body>
</html>

`,
    });

    console.log("Correo electrónico de validación enviado correctamente.");
    return true;
  } catch (error) {
    console.error(
      "Error al enviar el correo electrónico de validación:",
      error
    );
    return false;
  }
};

export const updateUserValidation = async (userId) => {
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error("Usuario no encontrado Servicio");
    }

    user.userValidated = true; 
    await user.save();

    return true; 
  } catch (error) {
    console.error("Error al actualizar la validación del usuario:", error);
    return false;
  }
};
