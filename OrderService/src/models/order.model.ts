import mongoose, { Schema } from "mongoose";

export type OrderStatus = "pending" | "shipped" | "delivered";

interface IOrderItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface IOrder extends mongoose.Document {
  userId: string;
  items: IOrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: {
    street: string;
    city: string;
    province: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true, index: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
    },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  { timestamps: true },
);

const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default Order;
