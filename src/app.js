import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";



const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
const db = mongoClient.db("iFit");

try {
    await mongoClient.connect();
  } catch (err) {
    console.log(err);
  }

 app.post("/login", async(req,res) => {
    const user = req.body;
    try{
     await db.collection("user").insertOne(user);
     res.sendStatus(201);
    }catch(erro){
        console.log(erro)
    }
 })

 app.get("/login", async(req,res) => {
    try{
     const response = await db.collection("user").find().toArray();
     res.send(response);
    }catch(erro){
        console.log(erro)
    }
 })


const port = process.env.PORT || 5000;
 app.listen(port, () => 
    console.log("Listen on port: `${port}`")
  );