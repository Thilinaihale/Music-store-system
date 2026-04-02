import mongoose, { Schema } from "mongoose";

export type ProductCategory = "string" | "percussion" | "keyboard";

export interface IProduct extends mongoose.Document {
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  stock: number;
  images: string[];
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["string", "percussion", "keyboard"],
      required: true,
    },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    images: [{ type: String }],
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

productSchema.index({ name: "text", brand: "text", description: "text" });

const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;
