import mongoose from "mongoose";
import { getCentersService } from "../services/center.service.js";


export const getCentersController = async (req, res) => {
  const users = await getCentersService({});
  return res.status(200).send({ success: true, response: users });
};