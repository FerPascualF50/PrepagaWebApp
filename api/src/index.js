import express from "express";

const app = express();

//Midelwares
app.use(express.json())

app.listen(3000, ()=> console.log(`API REST linstening on port ****`))