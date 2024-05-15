import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, USER_EMAIL } from "../config.js";
import { UserModel } from "../database/models/user.schema.js";
import { sendValidationEmailService, sendValidationPasswordService } from "../utils/send.email.js";

export const createUserService = async (userData) => {
  try {
    const { userName, password, firstName, lastName } = userData;
    const isUser = await UserModel.findOne({ userName });
    if (isUser) throw new Error('El usuario ya se encuentra registrado');
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmationCode = await bcrypt.hash(userName, 10);
    const newUser = new UserModel({
      userName,
      password: hashedPassword,
      firstName,
      lastName,
      confirmationCode: hashedConfirmationCode,
    });
    const createdUser = await newUser.save();
    const emailSent = await sendValidationEmailService(createdUser._id, userName);
    return {id: createdUser['_id'], userNameCreated: createdUser.userName};
  } catch (error) {
    throw error;
  }
};

export const userValidationService = async (userId, userName) => {
  try {
    const userInfo = await UserModel.findById(userId);
    if(!userInfo) throw new Error('Usuario inexistente')
    if (userInfo.userValidated ) throw new Error('Tu cuenta ya se encuentra confirmada.\nSolo logueate.');
    const confirmationCodeMatch = await bcrypt.compare(userName, userInfo.confirmationCode);
    if (!confirmationCodeMatch) throw new Error('Ups... algo pasó');
    userInfo.userValidated = true;
    await userInfo.save();
    return true;
  } catch (error) {
    throw error;
  }
};

export const loginService = async (userName, password) => {
  try {
    const user = await UserModel.findOne({ userName }).select('userName password rol firstName userValidated imageProfile' );
    UserModel.schema.path("password").select(true);
    if ( !user ) throw new Error("Nombre de usuario o contraseña incorrectos");
    if (!user.userValidated) throw new Error ('Revisa tu e-mail y valida tu cuenta')
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error("Credenciales incorrectas");
    UserModel.schema.path("password").select(false);
    const payload = {
      id: user._id,
      userName,
      rol: user.rol,
      firstName: user.firstName,
      imageProfile: user.imageProfile
    };
    const access_token = jwt.sign(payload, process.env.JWT_SECRET);
    return {userData: payload, access_token};
  } catch (error) {
    throw error;
  }
};

export const forgotPassService = async (userName) => {
  try {
    const user = await UserModel.findOne({ userName }).select('userName');
    if(!user) throw new Error('Usuario inexistente')
    const hashedConfirmationCode = await sendValidationPasswordService(userName);
    user.codeToChagePass = hashedConfirmationCode;
    await user.save();
    return  true ;
  } catch (error) {
    throw error;
  }
};

export const passValidationService = async (userName, password, code) => {
  try {
    UserModel.schema.path("password").select(true);
    const user = await UserModel.findOne({userName});
    if(!user) throw new Error('Usuario inexistente')
    const confirmationCodeMatch = await bcrypt.compare(code, user.codeToChagePass);
    if (!confirmationCodeMatch) throw new Error('Ups... algo pasó');
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword
    user.codeToChagePass = '';    
    await user.save();
    UserModel.schema.path("password").select(false);
    return true;
  } catch (error) {
    throw error;
  }
};

export const validateTokenService = async (userName) => {
  try {
    const user = await UserModel.findOne({ userName }).populate('plan', 'name');
    if(!user) throw new Error('Usuario inexistente')
    return  user ;
  } catch (error) {
    throw error;
  }
};