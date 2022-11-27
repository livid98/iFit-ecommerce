import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { userCollection, sessionCollection } from "../database/db.js";


export async function Registration(req, res) {
    const { name, email, phone, password } = req.body;
    try {
        const hashPassword = bcrypt.hashSync(password, 10);
        await userCollection.insertOne({ name, email, phone, password: hashPassword });
        res.sendStatus(201);
    } catch (erro) {
        console.log(erro);
        res.sendStatus(500);
    }
}

export async function Login(req, res) {
    const { email, password } = req.body;
    const token = uuidV4();
    try {
        const UserExist = await userCollection.findOne({ email: email })
        const activeUser = await sessionCollection.findOne({ userId: UserExist._id });

        if (activeUser) {
            res.status(401).send({ message: "Você já está logado" });
            return;
        }
        await sessionCollection.insertOne({ token, userId: UserExist._id });
        res.status(201).send({ token });
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}