import mongoose, { Schema } from "mongoose";

interface ICartItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface ICart extends mongoose.Document {
  userId: string;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<ICartItem>(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const cartSchema = new Schema<ICart>(
  {
    userId: { type: String, required: true, index: true, unique: true },
    items: [cartItemSchema],
  },
  { timestamps: true },
);

const Cart = mongoose.models.Cart || mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
