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
    },
    codeToChagePass: {
      type: String,
      default:'',
    }

  }, {timestamps: true});
  
export const UserAuthModel = mongoose.model("UserAuth", UserAuthSchema);