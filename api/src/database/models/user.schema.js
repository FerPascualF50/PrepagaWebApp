import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    userName: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 8,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
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
    imageProfile: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fthenounproject.com%2Fbrowse%2Ficons%2Fterm%2Fprofile-picture%2F&psig=AOvVaw2PEsDrRf0Sx1DTqix9jgx0&ust=1715433883289000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMj64LCXg4YDFQAAAAAdAAAAABAJ",
    },
    confirmationCode: {
      type: String,
      unique: true,
    },
    codeToChagePass: {
      type: String,
      default:'',
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);