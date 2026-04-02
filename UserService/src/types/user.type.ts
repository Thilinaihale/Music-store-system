import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  phone?: string;
  adresses: IAddress[];
  whishlist: { productId: string }[];
  preferences: {
    categories: string[];
    budgetMin: number;
    budgetMax: number;
  };
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  comparePassword(password: string): Promise<boolean>;
}

export interface IAddress {
  lable?: string;
  street: string;
  city: string;
  province: string; // state or province
  zipCode: string;
  country: string; //are we limiting this to a specific country?
}
