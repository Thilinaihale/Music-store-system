import type { Request, Response } from "express";
import {
  createDelivery,
  deleteDelivery,
  getDeliveryByOrderId,
  listDeliveries,
  updateDelivery,
} from "../services/delivery.service.js";

export async function createDeliveryHandler(req: Request, res: Response) {
  try {
    const delivery = await createDelivery(req.body);
    res.status(201).json({ message: "Delivery created", delivery });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create delivery",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function listDeliveriesHandler(req: Request, res: Response) {
  try {
    const userId =
      typeof req.query.userId === "string" ? req.query.userId : undefined;
    const deliveries = await listDeliveries(userId);
    res.status(200).json({ deliveries });
  } catch (error) {
    res.status(400).json({
      message: "Failed to list deliveries",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function getDeliveryByOrderHandler(req: Request, res: Response) {
  try {
    const delivery = await getDeliveryByOrderId(String(req.params.orderId));
    if (!delivery) {
      res.status(404).json({ message: "Delivery not found" });
      return;
    }

    res.status(200).json({ delivery });
  } catch (error) {
    res.status(400).json({
      message: "Failed to fetch delivery",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function updateDeliveryHandler(req: Request, res: Response) {
  try {
    const delivery = await updateDelivery(String(req.params.orderId), req.body);
    if (!delivery) {
      res.status(404).json({ message: "Delivery not found" });
      return;
    }

    res.status(200).json({ message: "Delivery updated", delivery });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update delivery",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function deleteDeliveryHandler(req: Request, res: Response) {
  try {
    const delivery = await deleteDelivery(String(req.params.orderId));
    if (!delivery) {
      res.status(404).json({ message: "Delivery not found" });
      return;
    }

    res.status(200).json({ message: "Delivery deleted", delivery });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete delivery",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
