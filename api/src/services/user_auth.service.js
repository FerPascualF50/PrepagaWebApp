import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, USER_EMAIL } from "../config.js";
import { UserAuthModel } from "../database/models/user_auth.schema.js";
import { UserModel } from "../database/models/user.schema.js";
import { confirmEmailTemplate } from "../emailTemplates/confirm.user.email.js"
import { transporter } from "../utils/send.email.js";


export const createUserAuthService = async (userData) => {
  try {
    const { userName, password, firstName, lastName } = userData;
    const isUser = await UserAuthModel.findOne({ userName });
    if (isUser) throw new Error('El usuario ya se encuentra registrado');
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserAuth = new UserAuthModel({
      userName,
      password: hashedPassword,
    });
    const createdUserAuth = await newUserAuth.save();
    const hashedConfirmationCode = await bcrypt.hash(userName, 10);
    const newUser = new UserModel({
      _id: createdUserAuth._id,
      firstName,
      lastName,
      confirmationCode: hashedConfirmationCode,
    });
    const createdUser = await newUser.save();
    const emailSent = await sendValidationEmailService(createdUserAuth._id, userName);
    return {id: createdUser['_id'], userNameCreated: createdUserAuth.userName} ;
  } catch (error) {
    throw error;
  }
};

const sendValidationEmailService = async (userId, userName) => {
  try {
    const user = await UserAuthModel.findById(userId);
    if (!user) throw new Error("El usuario no existe");
    const validationLink = `http://localhost:4000/api/auth/validate-email/${userId}?userName=${encodeURIComponent(userName)}`;
    const emailBody = confirmEmailTemplate.replace('{{validationLink}}', validationLink);
    await transporter.sendMail({
      from: USER_EMAIL,
      to: userName,
      subject: "Valida tu correo en Salud +",
      text: `Haz click en el siguiente enlace para validar tu e-mail ${validationLink}`,
      html: emailBody
    });
  } catch (error) {
    console.error("Error al enviar el e-mail de validación:", error.message);
    throw error;
  }
};

export const userValidationService = async (userId, userName) => {
  try {
    const userInfo = await UserModel.findById(userId);
    if(!userInfo) throw new Error('Usuario inexistente')
    const confirmationCodeMatch = await bcrypt.compare(userName, userInfo.confirmationCode);
    if (!confirmationCodeMatch) throw new Error('Ups... algo pasó');
    userInfo.userValidated = true;
    await userInfo.save();
    return true;
  } catch (error) {
    throw error;
  }
};

export const userLoginService = async (userName, password) => {
  try {
    UserAuthModel.schema.path("password").select(true);
    const userAuth = await UserAuthModel.findOne({ userName });
    if ( !userAuth ) throw new Error("Nombre de usuario o contraseña incorrectos");
    const userInfo = await UserModel.findById(userAuth._id).select('userValidated');
    if (!userInfo.userValidated) throw new Error ('Revisa tu e-mail y valida tu cuenta')
    const passwordMatch = await bcrypt.compare(password, userAuth.password);
  if (!passwordMatch) throw new Error("Credenciales incorrectos");
  const payload = {
    _id: userAuth._id,
    userName: userAuth.userName,
    rol: userInfo.firstName,
  };
  const access_token = jwt.sign(payload, process.env.JWT_SECRET);
  UserAuthModel.schema.path("password").select(false);
   return access_token;
  } catch (error) {
    throw error;
  }
};