import express from "express";
import mongoose from "./database/db.js";
import { middlewares } from './utils/middlewares.js';
import { router }  from "./routes/index.js";
import morgan from 'morgan';

const PORT = process.env.PORT;
const server = express();
server.use(middlewares);
server.use(morgan('dev'));
server.use("/api", router);


server.listen(PORT, () => console.log(`API listening on port ****`));