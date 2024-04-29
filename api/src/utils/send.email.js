import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { USER_EMAIL, EMAIL_PASS } from "../config.js";
import { confirmEmailTemplate } from "../emailTemplates/confirm.user.email.js";
import { confirmEmailPassTemplate } from "../emailTemplates/confirm.pass.js";



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

export const sendValidationEmailService = async (userId, userName) => {
  try {
    const validationLink = `http://localhost:4000/api/auths/validate-email/${userId}?userName=${encodeURIComponent(userName)}`;
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

export const sendValidationPasswordService = async (userName) => {
  try {
    const validateCode = (Math.floor(Math.random() * 900000) + 100000).toString();
    const hashedConfirmationCode = bcrypt.hash((validateCode), 10);
    const emailBody = confirmEmailPassTemplate.replace('{{validateCode}}', validateCode);
    await transporter.sendMail({
      from: USER_EMAIL,
      to: userName,
      subject: "Tu código para cambiar tu contraseña Salud +",
      text: `Ingresa tu nuea contraseña en nuestra WEB`,
      html: emailBody
    });
    return hashedConfirmationCode
  } catch (error) {
    console.error("Error al enviar el e-mail de validación:", error.message);
    throw error;
  }
};