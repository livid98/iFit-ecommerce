import { productsCollection } from "../src/app.js";

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
  const { name, description, image } = req.body;

  try {
    await productsCollection.insertOne({
      name,
      description,
      image,
    });
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}
