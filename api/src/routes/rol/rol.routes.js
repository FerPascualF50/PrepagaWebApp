import express from "express";
import {
  //  getAllRoles, RolById, 
  registerRol
  // ,  updateRol, deleteRol
 } from "../../controllers/rol.controller.js";

export const rolRouter = express.Router();

rolRouter
  // .get("/", getAllRoles)
  // .get("/:id", RolById)
  .post("/", registerRol)
  // .patch("/:id", updateRol)
  // .delete("/:id", deleteRol)