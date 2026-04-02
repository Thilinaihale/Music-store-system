//register User
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import type { IAddress } from "../types/user.type.js";

interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (userData: RegisterUserDTO) => {
  const { name, email, password } = userData;

  //check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  // create new user
  const newUser = new User({
    name,
    email,
    password,
  });

  const user = await newUser.save();

  //remove the password field before returning the user object
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

interface LoginDTO {
  email: string;
  password: string;
}

export const loginUser = async (payload: LoginDTO) => {
  const { email, password } = payload;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  user.lastLogin = new Date();
  await user.save();

  const token = jwt.sign(
    { userId: user._id.toString(), role: user.role },
    process.env.JWT_SECRET || "change_this_in_production",
    { expiresIn: "1d" },
  );

  const userObj = user.toObject();
  delete userObj.password;

  return { token, user: userObj };
};

export const getProfileById = async (userId: string) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const updateProfileById = async (
  userId: string,
  payload: { name?: string; phone?: string },
) => {
  const updated = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        ...(payload.name ? { name: payload.name } : {}),
        ...(payload.phone ? { phone: payload.phone } : {}),
      },
    },
    { new: true, runValidators: true, projection: "-password" },
  );

  if (!updated) {
    throw new Error("User not found");
  }

  return updated;
};

export const addAddressToProfile = async (
  userId: string,
  address: IAddress,
) => {
  const updated = await User.findByIdAndUpdate(
    userId,
    { $push: { adresses: address } },
    { new: true, runValidators: true, projection: "-password" },
  );

  if (!updated) {
    throw new Error("User not found");
  }

  return updated;
};

export const updateAddressByIndex = async (
  userId: string,
  index: number,
  address: Partial<IAddress>,
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (index < 0 || index >= user.adresses.length) {
    throw new Error("Address index is out of range");
  }

  user.adresses[index] = {
    ...user.adresses[index],
    ...address,
  } as IAddress;

  await user.save();

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

export const deleteAddressByIndex = async (userId: string, index: number) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (index < 0 || index >= user.adresses.length) {
    throw new Error("Address index is out of range");
  }

  user.adresses.splice(index, 1);
  await user.save();

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};
