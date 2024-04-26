import jwt from "jsonwebtoken";
import express from 'express';
import 'dotenv/config';

export const middlewares = express();
middlewares.use(express.json());
middlewares.use(express.urlencoded({ extended: true }));
middlewares.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ code: 500, message: err.message });
});// catch all errors. 1- eslint-disable-next-line no-unused-vars
middlewares.use((err, req, res, next) => {
  console.error(err.stack);
  console.log("Node NOT Exiting...");
});// 2- catch unhandled rejection from promises.

export const authMiddleware = (req, res, next) => {
   try {
      const accsess_token = req.headers.authorization.split(" ").pop();
      if (!accsess_token) throw new Error('Token inexistente');
      const user = jwt.verify(accsess_token, process.env.JWT_SECRET);
      req.user = user;
      next();
   } catch (error) {
      res.json({ success: false, response: error.message });
   }
};

export const unauthorizedMiddleware = async (req, res, next) => {
  try {
    const { rol } = req.user;
    if (rol !== "admin") {
      throw new Error(`Acceso no autorizado. El rol: ${rol} no tiene acceso.`);
    }
    next();
  } catch (error) {
    res.json({ success: false, response: error.message });
  }
};