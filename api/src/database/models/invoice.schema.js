import mongoose from "mongoose";

const InvoiceSchema = mongoose.Schema({
    number: {
      type: Number,
      min: 1,
      max: 99999999,
    },
    issueDate: {
      type: Date,
      default: Date.now(),
    },
    period:{
      year:{
        type: Number,
      },
      month:{
        type: Number,
      },
    },
    expirationPayment:{
      type: Date,
      default: () => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 10);
        return currentDate;
      } 
    },
    statusPayment:{
      type: String,
      enum: ['pending', 'paid'],
        type: String,
        default: 'pending'
    },
    client:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    clientInfo: {
      firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    cellphone: {
      type: Number,
      minlength: 10,
      maxlength: 10,
    },
    address: {
      type: String,
      minlength: 6,
      maxlength: 80,
    },
      taxId: {
        type: String,
        minlength: 11,
        maxlength: 11,
      },
    },
    descriptionInvoice:{
      type: String,
    },
    price: {
      type: Number
    },
});

export const InvoiceModel = mongoose.model("Invoice", InvoiceSchema);