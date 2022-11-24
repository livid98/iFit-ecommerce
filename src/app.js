import express from "express";
import cors from "cors";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import autherouter from './routes/auth.router.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(autherouter);
  
  export const userSchema = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().email().required(),
  phone: joi.string().length(11).pattern(/^[0-9]+$/).required(),
  password: joi.string().alphanum().min(6).max(10).required(),
 })




const port = process.env.PORT || 5000;
 app.listen(port, () => 
    console.log(`Listen on port: ${port}`));