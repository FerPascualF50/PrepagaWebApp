import express from "express";
import { userRouter } from "./routes/user/userRoutes.js";

const server = express();
const PORT = process.env.PORT || 4000;

//Midelwares
server.use(express.json());

//Rutas
server.use("/api/user", userRouter)


server.listen(PORT, ()=> console.log(`API REST linstening on port ****`))