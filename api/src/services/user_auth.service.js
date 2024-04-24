import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, USER_EMAIL } from "../config.js";
import { UserAuthModel } from "../database/models/user_auth.schema.js";
import { UserModel } from "../database/models/user.schema.js";
import { sendValidationEmailService, sendValidationPasswordService } from "../utils/send.email.js";

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
    return {id: createdUser['_id'], userNameCreated: createdUserAuth.userName};
  } catch (error) {
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
    const userAuth = await UserAuthModel.findOne({ userName }).select('userName');
    if ( !userAuth ) throw new Error("Nombre de usuario o contraseña incorrectos");
    const userInfo = await UserModel.findOne({ _id: userAuth._id }).select('rol userValidated firstName');
    if (!userInfo.userValidated) throw new Error ('Revisa tu e-mail y valida tu cuenta')
    const passwordMatch = await bcrypt.compare(password, userAuth.password);
    if (!passwordMatch) throw new Error("Credenciales incorrectas");
    UserAuthModel.schema.path("password").select(false);
    const payload = {
    id: userAuth._id,
    userName: userAuth.userName,
    rol: userInfo.rol,
    firstName: userInfo.firstName
    };
    console.log(payload)
    const access_token = jwt.sign(payload, process.env.JWT_SECRET);
    return access_token;
  } catch (error) {
    throw error;
  }
};

export const forgotPassService = async (userName) => {
  try {
    const userAuth = await UserAuthModel.findOne({ userName });
    if(!userAuth) throw new Error('Usuario inexistente')
    const hashedConfirmationCode = await sendValidationPasswordService(userName);
    userAuth.codeToChagePass = hashedConfirmationCode;
    await userAuth.save();
    return  true ;
  } catch (error) {
    throw error;
  }
};

export const passValidationService = async (userName, password, code) => {
  try {
    UserAuthModel.schema.path("password").select(true);
    const userInfo = await UserAuthModel.findOne({userName});
    if(!userInfo) throw new Error('Usuario inexistente')
    const confirmationCodeMatch = await bcrypt.compare(code, userInfo.codeToChagePass);
    if (!confirmationCodeMatch) throw new Error('Ups... algo pasó');
    const hashedPassword = await bcrypt.hash(password, 10);
    userInfo.password = hashedPassword
    userInfo.codeToChagePass = '';    
    await userInfo.save();
    UserAuthModel.schema.path("password").select(false);
    return true;
  } catch (error) {
    throw error;
  }
};

export const changePassService = async (userName, oldPass, newPass) => {
 try {
   UserAuthModel.schema.path("password").select(true);
  const userInfo = await UserAuthModel.findOne({userName});
  if(!userInfo) throw new Error('Usuario inexistente')
  const isOldPass = await bcrypt.compare(oldPass, userInfo.password);
  if (!isOldPass) throw new Error('Ups... algo pasó');
  const hashedPassword = await bcrypt.hash(newPass, 10);
  userInfo.password = hashedPassword
  await userInfo.save();
  UserAuthModel.schema.path("password").select(false);
  return true;
 } catch (error) {
  throw error;
 } 
};