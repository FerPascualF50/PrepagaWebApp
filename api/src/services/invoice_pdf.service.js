import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { InvoiceModel } from "../database/models/invoice.schema.js";
import { UserModel } from "../database/models/user.schema.js";
import { PlanModel } from '../database/models/plan.schema.js';
import { sendEmailPDFService } from "../utils/send.email.js"

export const getInvoicesPDFService = async (id, res) => { 
  try {
    const __dirname = path.resolve();
    const invoicesDir = path.join(__dirname, `/src/utils/invoices_PDF/`);
    const files = await fs.promises.readdir(invoicesDir);
    const invoiceFileName = files.find(file => file.startsWith(`${id}.pdf`));
    if (!invoiceFileName) throw new Error('Factura no encontrada');
    const filePath = path.join(invoicesDir, invoiceFileName);
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    throw error;
  }
};

export const createPDFInvoiceService = async (id) => { 
  try {
    const invoices = await InvoiceModel.findById(id)
    if(!invoices || invoices.length === 0) throw new Error('Aun no tiene comprobantes');
    const user = await UserModel.findById(invoices.client)
    if(!user) throw new Error('Cliente inexistente');
    const plan = await PlanModel.findById(user.plan)
    if(!plan) throw new Error('Cliente no posee un plan contratado');
    const __dirname = path.resolve();
    const pdfPath = path.join(__dirname , "/src/utils/invoices_PDF/invoice_template.pdf");
    const existingPdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const page = pdfDoc.getPage(0);
    page.drawText(`000000${invoices.number}`, {
      x: 525,
      y: 749,
      size: 10,
    });
    const issueDate = new Date(invoices.issueDate);
    const formattedDate = `${issueDate.getDate()}/${issueDate.getMonth() + 1}/${issueDate.getFullYear()}`;
    page.drawText(formattedDate, {
      x: 425,
      y: 733.5,
      size: 10,
    });
    page.drawText(`${invoices.period.month} / ${invoices.period.year}                           ${invoices.period.month} / ${invoices.period.year} `, {
      x: 140,
      y: 663,
      size: 12,
    });
    const expirationPayment = new Date(invoices.expirationPayment);
    const formatDate = `${expirationPayment.getDate()}/${expirationPayment.getMonth() + 1}/${expirationPayment.getFullYear()}`;
    page.drawText(formatDate, {
      x: 488,
      y: 662,
      size: 10,
    });
    page.drawText(`${user.taxId}                                                                                          ${user.firstName} ${user.lastName} `, {
      x: 50,
      y: 645,
      size: 10,
    });
    page.drawText(`${user.address}`, {
      x: 355,
      y: 628,
      size: 9,
    });
    page.drawText(`Plan: ${plan.name}`, {
      x: 30,
      y: 560,
      size: 9,
    });
    page.drawText(`${invoices.price},00`, {
      x: 520,
      y: 560,
      size: 10,
    });
    page.drawText(`${invoices.price},00`, {
      x: 527,
      y: 223,
      size: 10,
    });
    page.drawText(`${invoices.price},00`, {
      x: 528,
      y: 186,
      size: 10,
    });
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(`../api/src/utils/invoices_PDF/${invoices._id}.pdf`, pdfBytes);
    await sendEmailPDFService(invoices._id, user.userName);
    return ;
  } catch (error) {
    throw error;
  }
};