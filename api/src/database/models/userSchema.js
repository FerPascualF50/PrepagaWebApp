import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
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
    rol: {
      type: String,
      default: "user",
    },
    userValidated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const UserModel =  mongoose.model("User", UserSchema);