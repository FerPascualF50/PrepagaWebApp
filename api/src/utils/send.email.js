import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import fs from 'fs';
import path from 'path';
import { USER_EMAIL, EMAIL_PASS } from "../config.js";
import { confirmEmailTemplate } from "../emailTemplates/confirm.user.email.js";
import { confirmEmailPassTemplate } from "../emailTemplates/confirm.pass.js";
import { invoicePDFTemplate } from "../emailTemplates/invoice_pdf.js";

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

export const sendEmailPDFService = async (id, userName) => {
  try {
    const __dirname = path.resolve();
    const pdfPath = path.join(__dirname, `/src/utils/invoices_PDF/${id}.pdf`);
    const pdfBytes = fs.readFileSync(pdfPath);
    const emailBody = invoicePDFTemplate;
    try {
      await transporter.sendMail({
        from: USER_EMAIL,
        to: userName,
        subject: "Tu nueva Factura de Vita +",
        text: `En nuestra WEB tambien podrás descargarla`,
        html: emailBody,
        attachments: [{ filename: `${id}.pdf`, content: pdfBytes }]
      });
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error("Error al enviar el e-mail con factura:", error.message);
      throw error
    }
  } catch (error) {
    console.error("Error al enviar el e-mail con factura:", error.message);
    throw error;
  }
};