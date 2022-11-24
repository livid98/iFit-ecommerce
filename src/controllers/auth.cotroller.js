import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { userSchema} from "../app.js";
import {userCollection, sessionCollection } from "../database/db.js";


export async function Registration(req,res){
    const {name, email, phone, password} = req.body;
    const validation = userSchema.validate({name, email, phone, password}, { abortEarly: false });
    if(validation.error){
       const erros = validation.error.details.map((detail) => 
       detail.message);
       res.status(401).send(erros);
       return;
    }
    try{
     const UserExist = await userCollection.findOne({email: email});
     if(UserExist){
      res.sendStatus(409);
      return;
     }
     const hashPassword = bcrypt.hashSync(password, 10);

    await userCollection.insertOne({name, email, phone, password: hashPassword });
    res.sendStatus(201);
    }catch(erro){
        console.log(erro);
        res.sendStatus(500);
    }
 }

 export async function Login(req,res){
    const {email,password} = req.body;
    const token = uuidV4();
      try{
       const UserExist = await userCollection.findOne({email: email})
       if(!UserExist){
        res.sendStatus(401);
        return;
       }
       const samePassword = bcrypt.compareSync(password, UserExist.password);
       if (!samePassword) {
           res.sendStatus(401);
           return;
         }
         const activeUser = await userCollection.findOne({ userId: UserExist._id });
   
       if (activeUser) {
          res.status(401).send({ message: "Você já está logado"});
          return;
       }
       await sessionCollection.insertOne({token,userId: UserExist._id});
       res.status(201).send({ token });
      }catch(erro){
          console.log(erro)
          res.sendStatus(500)
      }
   }