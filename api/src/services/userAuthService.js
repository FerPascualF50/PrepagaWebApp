import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, USER_EMAIL, EMAIL_PASS } from "../config.js";
import nodemailer from "nodemailer";
import { UserAuthModel } from "../database/models/userAuthSchema.js";
import { UserModel } from "../database/models/userSchema.js";
import { confirmEmailTemplate } from "../emailTemplates/confirm.user.email.js"


export const createUserAuth = async (userData) => {
  try {
    const { userName, password, firstName, lastName } = userData;

    const isUser = await UserAuthModel.findOne({ userName });
    if (isUser) throw new Error('El usuario ya se encuentra registrado');
  
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const newUserAuth = new UserAuthModel({
      userName,
      password: hashedPassword,
    });

    const createdUserAuth = await newUserAuth.save();

    const hashedConfirmationCode = await bcrypt.hash(userName, saltOrRounds);

    const newUser = new UserModel({
      _id: createdUserAuth._id,
      firstName,
      lastName,
      confirmationCode: hashedConfirmationCode,
    });

    const createdUser = await newUser.save();

    const emailSent = await sendValidationEmailService(createdUserAuth._id, userName);

    return {id: createdUserAuth['_id'], userNameCreated: createdUserAuth.userName} ;
  } catch (error) {
    throw error;
  }
};


// envio de mail de confirmación
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  tls: { rejectUnauthorized: false },
  auth: {
    user: USER_EMAIL,
    pass: EMAIL_PASS,
  },
});

const sendValidationEmailService = async (userId, userName) => {
  try {
    const user = await UserAuthModel.findById(userId);

    if (!user) throw new Error("El usuario no existe");
    
    const validationLink = `http://localhost:4000/api/auth/validate-email/${userId}?userName=${encodeURIComponent(userName)}`;

    const emailBody = confirmEmailTemplate.replace('{{validationLink}}', validationLink);

    await transporter.sendMail({
      from: USER_EMAIL,
      to: user.userName,
      subject: "Valida tu correo en Salud +",
      text: `Haz click en el siguiente enlace para validar tu e-mail ${validationLink}`,
      html: emailBody
    });
  } catch (error) {
    console.error("Error al enviar el e-mail de validación:", error.message);
    throw error.message;
  }
};

export const updateUserValidation = async (userId, userName) => {
  try {
    const user = await UserAuthModel.findById(userId);
    const userDB = await UserModel.findById(userId);

    const confirmationCodeMatch = await bcrypt.compare(userName, userDB.confirmationCode);
    
    if (!user && !confirmationCodeMatch) throw new Error("Usuario inexistente");
  
    userDB.userValidated = true;
    await userDB.save();

    return true;
  } catch (error) {
    console.error(error)
    return false;
  }
};

export const userAuth = async (userName, password) => {
  try {
    UserAuthModel.schema.path("password").select(true);
    const userAuth = await UserAuthModel.findOne({ userName });

    if ( !userAuth ) throw new Error("Nombre de usuario o contraseña incorrectos");
    UserAuthModel.schema.path("password").select(false);

    const userInfo = await UserModel.findById( userAuth._id );
    
    if (!userInfo.userValidated ) throw new Error ('Revisa tu e-mail y valida tu cuenta')
    
    const passwordMatch = await bcrypt.compare(password, userAuth.password);
    if (!passwordMatch) throw new Error("Nombre de usuario o contraseña incorrectos");

    const payload = {
      _id: userAuth._id,
      userName: userAuth.userName,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName
    };

    const access_token = jwt.sign(payload, process.env.JWT_SECRET);
    return access_token;
  } catch (error) {
    throw error;
  }
};
