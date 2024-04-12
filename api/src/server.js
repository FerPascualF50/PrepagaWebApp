import express from "express";
import { userRouter } from "./routes/user/userRoutes.js";

const server = express();

//Midelwares
server.use(express.json())

//Rutas
server.use("/api/user", userRouter)


server.listen(4000, ()=> console.log(`API REST linstening on port ****`))