import {
  productsCollection,
  historicCollection,
  sessionCollection,
  userCollection,
} from "../database/db.js";
import dayjs from "dayjs";

export async function getProducts(req, res) {
  try {
    const products = await productsCollection.find().toArray();
    res.send(products);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postProducts(req, res) {
  const { name, description, image, category } = req.body;

  try {
    await productsCollection.insertOne({
      name,
      description,
      image,
      category,
    });
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function deleteProducts(req, res) {
  const { name } = req.headers;
  try {
    const products = await productsCollection.findOne({ name });
    await productsCollection.deleteOne({ name: products.name });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(409);
  }
}

export async function postHistoric(req, res) {
  const { carb, prot, salad } = req.body;

  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const session = await sessionCollection.findOne({ token });
  const user = await userCollection.findOne({ _id: session?.userId });

  try {
    if (!session) {
      return res.status(401).send({ message: "Você não está logado" });
    }

    const newValue = {
      date: dayjs().format("DD/MM"),
      carb: carb,
      prot: prot,
      salad: salad,
      email: user.email,
      name: user.name,
    };

    await historicCollection.insertOne(newValue);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getHistoric(req, res) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const session = await sessionCollection.findOne({ token });
    const user = await userCollection.findOne({ _id: session?.userId });

    const historic = await historicCollection
      .find({ email: user.email })
      .sort({ _id: -1 })
      .toArray();

    res.status(201).send([historic, user.name]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
