import mongoose, { Schema } from "mongoose";

export type DeliveryStatus = "pending_pickup" | "in_transit" | "delivered";

export interface IDelivery extends mongoose.Document {
  orderId: string;
  userId: string;
  carrier?: string;
  trackingNumber?: string;
  status: DeliveryStatus;
  estimatedDeliveryDate?: Date;
  deliveredAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const deliverySchema = new Schema<IDelivery>(
  {
    orderId: { type: String, required: true, index: true, unique: true },
    userId: { type: String, required: true, index: true },
    carrier: { type: String },
    trackingNumber: { type: String },
    status: {
      type: String,
      enum: ["pending_pickup", "in_transit", "delivered"],
      default: "pending_pickup",
    },
    estimatedDeliveryDate: { type: Date },
    deliveredAt: { type: Date },
    notes: { type: String },
  },
  { timestamps: true },
);

const Delivery =
  mongoose.models.Delivery ||
  mongoose.model<IDelivery>("Delivery", deliverySchema);

export default Delivery;
