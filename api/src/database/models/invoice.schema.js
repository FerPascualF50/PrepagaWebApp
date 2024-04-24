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
        min: 2023,
        max: 2999,
      },
      month:{
        type: Number,
        min: 1,
        max: 12
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
    descriptionInvoice:{
      type: String,
    },
    price: {
      type: Number
    },
    deleted: {
      type: Boolean,
      default: false,
    }
});

export const InvoiceModel = mongoose.model("Invoice", InvoiceSchema);