import mongoose, { Schema } from "mongoose";
import type { IUser } from "../types/user.type.js";
import bcrypt from "bcrypt";

const addressSchema = new Schema({
  lable: { type: String },
  street: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
});

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    phone: { type: String },
    adresses: [addressSchema],
    whishlist: [{ productId: { type: String } }],
    preferences: {
      categories: [{ type: String }],
      budgetMin: { type: Number },
      budgetMax: { type: Number },
    },
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },
  },
  { timestamps: true },
);

//adding the password hashing middleware
userSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
