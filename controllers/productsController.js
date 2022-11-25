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
    if (!products) {
      res.sendStatus(400);
      return;
    }

    await productsCollection.deleteOne({ name: products.name });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(409);
  }
}
