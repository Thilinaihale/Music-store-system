import express from "express";
import {
  createProductHandler,
  decreaseStockHandler,
  deleteProductHandler,
  getProductByIdHandler,
  listProductsHandler,
  updateProductHandler,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createProductHandler);
router.get("/", listProductsHandler);
router.get("/:id", getProductByIdHandler);
router.put("/:id", updateProductHandler);
router.delete("/:id", deleteProductHandler);
router.patch("/:id/stock/decrease", decreaseStockHandler);

export default router;
