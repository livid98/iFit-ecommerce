import { Router } from "express";
import {
  deleteProducts,
  getProducts,
  postProducts,
  postHistoric,
  getHistoric,
} from "../controllers/productsController.js";
import { ProductValidation } from "../middlewares/product.middleware.js";

const router = Router();

router.get("/products", getProducts);

router.post("/products", postProducts);

router.delete("/products", ProductValidation, deleteProducts);

router.post("/checkout", postHistoric);

router.get("/checkout", getHistoric);

export default router;
