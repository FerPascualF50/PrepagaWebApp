import express from "express";
import {
  //  getAllRoles, RolById, 
  registerAll
  // ,  updateRol, deleteRol
 } from "../controllers/all.controller.js";

export const allRouter = express.Router();

allRouter
  // .get("/", getAllRoles)
  // .get("/:id", RolById)
  .post("/", registerAll)
  // .patch("/:id", updateRol)
  // .delete("/:id", deleteRol)