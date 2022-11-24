import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
  } catch (err) {
    console.log(err);
  }
  const db = mongoClient.db("iFit");
  export const userCollection = db.collection("user");
  export const sessionCollection = db.collection("session");