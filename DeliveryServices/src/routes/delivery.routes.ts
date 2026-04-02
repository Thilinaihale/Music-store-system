import express from "express";
import {
  createDeliveryHandler,
  deleteDeliveryHandler,
  getDeliveryByOrderHandler,
  listDeliveriesHandler,
  updateDeliveryHandler,
} from "../controllers/delivery.controller.js";

const router = express.Router();

router.post("/", createDeliveryHandler);
router.get("/", listDeliveriesHandler);
router.get("/order/:orderId", getDeliveryByOrderHandler);
router.put("/order/:orderId", updateDeliveryHandler);
router.delete("/order/:orderId", deleteDeliveryHandler);

export default router;
