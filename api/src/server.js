import express from "express";
import mongoose from "./database/db.js";
import  { router }  from "./routes/index.js";

const server = express();
const PORT = process.env.PORT;

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true })); //query string
server.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({ code: 500, message: err.message });
}); // catch all errors. 1- eslint-disable-next-line no-unused-vars
process.on('uncaughtException', function (err) {
  console.error(err.stack);
  console.log("Node NOT Exiting...");
}); // 2- catch unhandled rejection from promises.

//Route
server.use("/api", router)

//Connect
server.listen(PORT, () => console.log(`API listening on port ****`));