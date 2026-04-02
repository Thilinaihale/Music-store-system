import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import {
  getUserOrders,
  placeOrder,
  updateOrderStatus,
} from "../services/order.service.js";

export async function placeOrderHandler(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const order = await placeOrder(req.user!.userId, req.body.shippingAddress);
    res.status(201).json({ message: "Order placed", order });
  } catch (error) {
    res.status(400).json({
      message: "Failed to place order",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function getMyOrdersHandler(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const orders = await getUserOrders(req.user!.userId);
    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({
      message: "Failed to fetch orders",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function updateOrderStatusHandler(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    if (req.user?.role !== "admin") {
      res.status(403).json({ message: "Only admins can update order status" });
      return;
    }

    const status = req.body.status as "pending" | "shipped" | "delivered";
    const order = await updateOrderStatus(String(req.params.orderId), status);
    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update order status",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
