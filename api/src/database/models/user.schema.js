import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAuth",
    },
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
    },
    address: {
      type: String,
      minlength: 6,
      maxlength: 80,
    },
    taxId: {
      type: Number,
    },
    rol: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    userValidated: {
      type: Boolean,
      default: false,
    },
    deletedUser:{
      type: Boolean,
      default: false,
    },
    imageProfile: {
      type: String,
      default:
        "https://www.canva.com/design/DAGClBPXl8s/4G5HKvKG8hLR9S50bEV8cw/view?utm_content=DAGClBPXl8s&utm_campaign=designshare&utm_medium=link&utm_source=editor",
    },
    confirmationCode: {
      type: String,
      unique: true,
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
    },
    invoices: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);