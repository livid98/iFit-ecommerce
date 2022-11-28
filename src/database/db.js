import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
} catch (err) {
  console.log(err);
}

const db = mongoClient.db("iFit");

export const productsCollection = db.collection("products");
export const userCollection = db.collection("user");
export const sessionCollection = db.collection("session");
export const historicCollection = db.collection("historic");
