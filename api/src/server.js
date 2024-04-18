import express from "express";
import mongoose from "./database/db.js";
import { userRouter } from "./routes/user/userRoutes.js";
import { userAuthRouter } from "./routes/user/userAuthRoutes.js";

const server = express();
const PORT = process.env.PORT || 4000;

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// catch all errors.
// eslint-disable-next-line no-unused-vars
server.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({ code: 500, message: err.message });
});

// catch unhandled rejection from promises.
process.on('uncaughtException', function (err) {
    console.error(err.stack);
    console.log("Node NOT Exiting...");
});

// Routes
server.use("/api/user", userRouter);
server.use("/api/auth", userAuthRouter);

server.listen(PORT, () => console.log(`API REST listening on port ****`));