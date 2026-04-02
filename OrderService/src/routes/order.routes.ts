import express from "express";
import {
  getMyOrdersHandler,
  placeOrderHandler,
  updateOrderStatusHandler,
} from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, placeOrderHandler);
router.get("/me", verifyToken, getMyOrdersHandler);
router.patch("/:orderId/status", verifyToken, updateOrderStatusHandler);

export default router;
