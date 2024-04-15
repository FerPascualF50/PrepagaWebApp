import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES } from "../config.js";
import { UserAuthModel } from "../database/models/userAuthSchema.js";
import { UserModel } from "../database/models/userSchema.js";

export const createUserAndAuth = async (userData) => {
  try {
    const { userName, password, firstName, lastName } = userData;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUserAuth = new UserAuthModel({
      userName,
      password: hashedPassword,
    });

    const createdUserAuth = await newUserAuth.save();

    const newUser = new UserModel({
      _id: createdUserAuth._id,
      firstName,
      lastName,
    });

    const createdUser = await newUser.save();

    const access_token = jwt.sign({ id: createdUserAuth._id }, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });

    return access_token;
  } catch (error) {
    throw error.message;
  }
};

export const userAuth = async (userName, password) => {
  try {
    UserAuthModel.schema.path('password').select(true);
    const user = await UserAuthModel.findOne({ userName });
    UserAuthModel.schema.path('password').select(false);

    if (!user) {
      throw new Error("Nombre de usuario o contraseña incorrectos");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Nombre de usuario o contraseña incorrectos");
    }

    const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });

    return access_token;
  } catch (error) {
    throw error.message;
  }
};