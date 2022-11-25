import { userSchema } from "../app.js";
import { userCollection, sessionCollection } from "../database/db.js";
import bcrypt from "bcrypt";

export async function RegistrationValidation(req, res, next) {
   const { name, email, phone, password } = req.body;
   const validation = userSchema.validate({ name, email, phone, password }, { abortEarly: false });
   if (validation.error) {
      const erros = validation.error.details.map((detail) =>
         detail.message);
      res.status(401).send(erros);
      return;
   }
   const UserExist = await userCollection.findOne({ email: email });
   if (UserExist) {
      res.sendStatus(409);
      return;
   }
   next();
}


export async function LoginValidation(req, res, next) {
   const { email, password } = req.body;
   const UserExist = await userCollection.findOne({ email: email })
   if (!UserExist) {
      res.sendStatus(401);
      return;
   }
   const samePassword = bcrypt.compareSync(password, UserExist.password);
   if (!samePassword) {
      res.sendStatus(401);
      return;
   }
   
   next();
}