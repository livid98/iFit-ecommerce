import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import authrouter from './routes/auth.router.js';
import productsrouter from './routes/products.router.js';
import joi from "joi";
const app = express();
app.use(cors());
app.use(express.json());
app.use(authrouter);
app.use(productsrouter);

export const userSchema = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().email().required(),
  phone: joi.string().length(11).pattern(/^[0-9]+$/).required(),
  password: joi.string().alphanum().min(6).max(10).required(),
})


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listen on port: ${port}`));
