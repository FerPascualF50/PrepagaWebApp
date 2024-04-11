import express from "express";
import { userRouter } from "./routes/user/userRoutes.js";

const app = express();

//Midelwares
app.use(express.json())

//Rutas
app.use("/user", userRouter)


app.listen(3000, ()=> console.log(`API REST linstening on port ****`))