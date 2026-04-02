import express from "express";
import {
  addItemHandler,
  clearCartHandler,
  getCartHandler,
  removeItemHandler,
  updateItemHandler,
} from "../controllers/cart.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getCartHandler);
router.post("/items", verifyToken, addItemHandler);
router.put("/items/:productId", verifyToken, updateItemHandler);
router.delete("/items/:productId", verifyToken, removeItemHandler);
router.delete("/", verifyToken, clearCartHandler);

export default router;
