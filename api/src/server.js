import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import { userRouter } from "./routes/user/userRoutes.js";

const server = express();
const PORT = process.env.PORT || 4000;

//Midelwares
server.use(express.json());

//DataBase Connect
mongoose.connect(process.env.MONGO_DB_URI);

//Routes
server.use("/api/user", userRouter)


server.listen(PORT, ()=> console.log(`API REST listening on port ****`))