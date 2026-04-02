import Delivery, { type DeliveryStatus } from "../models/delivery.model.js";

interface CreateDeliveryDTO {
  orderId: string;
  userId: string;
  carrier?: string;
  trackingNumber?: string;
  estimatedDeliveryDate?: Date;
  notes?: string;
}

interface UpdateDeliveryDTO {
  carrier?: string;
  trackingNumber?: string;
  status?: DeliveryStatus;
  estimatedDeliveryDate?: Date;
  notes?: string;
}

export async function createDelivery(payload: CreateDeliveryDTO) {
  return Delivery.create(payload);
}

export async function listDeliveries(userId?: string) {
  if (userId) {
    return Delivery.find({ userId }).sort({ createdAt: -1 });
  }

  return Delivery.find().sort({ createdAt: -1 });
}

export async function getDeliveryByOrderId(orderId: string) {
  return Delivery.findOne({ orderId });
}

export async function updateDelivery(
  orderId: string,
  payload: UpdateDeliveryDTO,
) {
  const updatePayload: UpdateDeliveryDTO & { deliveredAt?: Date } = {
    ...payload,
  };

  if (payload.status === "delivered") {
    updatePayload.deliveredAt = new Date();
  }

  return Delivery.findOneAndUpdate(
    { orderId },
    { $set: updatePayload },
    { new: true },
  );
}

export async function deleteDelivery(orderId: string) {
  return Delivery.findOneAndDelete({ orderId });
}
