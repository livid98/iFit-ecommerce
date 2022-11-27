import { productsCollection } from "../database/db.js";

export async function ProductValidation(req, res, next) {
    const { name } = req.headers;
    const products = await productsCollection.findOne({ name });
    if (!products) {
        res.sendStatus(400);
        return;
    }
    next();
}
