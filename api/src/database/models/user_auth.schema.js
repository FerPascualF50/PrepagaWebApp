import mongoose from "mongoose";

const UserAuthSchema = mongoose.Schema({
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false
    }
  }, {timestamps: true});
  
export const UserAuthModel = mongoose.model("UserAuth", UserAuthSchema);