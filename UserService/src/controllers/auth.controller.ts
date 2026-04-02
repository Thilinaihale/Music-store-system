import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import {
  addAddressToProfile,
  deleteAddressByIndex,
  getProfileById,
  loginUser,
  registerUser,
  updateAddressByIndex,
  updateProfileById,
} from "../services/auth.service.js";

export async function register(req: Request, res: Response) {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    console.error("Error registering user:", error);
    res.status(500).json({
      message: "An error occurred while registering the user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const payload = await loginUser(req.body);
    res.status(200).json({
      message: "Login successful",
      ...payload,
    });
  } catch (error: any) {
    res.status(401).json({
      message: "Login failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function getProfile(req: AuthenticatedRequest, res: Response) {
  try {
    const profile = await getProfileById(req.user!.userId);
    res.status(200).json({ profile });
  } catch (error: any) {
    res.status(404).json({
      message: "Failed to fetch profile",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function updateProfile(req: AuthenticatedRequest, res: Response) {
  try {
    const profile = await updateProfileById(req.user!.userId, req.body);
    res.status(200).json({ message: "Profile updated", profile });
  } catch (error: any) {
    res.status(400).json({
      message: "Failed to update profile",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function addAddress(req: AuthenticatedRequest, res: Response) {
  try {
    const profile = await addAddressToProfile(req.user!.userId, req.body);
    res.status(200).json({ message: "Address added", profile });
  } catch (error: any) {
    res.status(400).json({
      message: "Failed to add address",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function updateAddress(req: AuthenticatedRequest, res: Response) {
  try {
    const index = Number(req.params.index);

    if (!Number.isInteger(index) || index < 0) {
      res
        .status(400)
        .json({ message: "Address index must be a non-negative integer" });
      return;
    }

    const profile = await updateAddressByIndex(
      req.user!.userId,
      index,
      req.body,
    );
    res.status(200).json({ message: "Address updated", profile });
  } catch (error: any) {
    res.status(400).json({
      message: "Failed to update address",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function deleteAddress(req: AuthenticatedRequest, res: Response) {
  try {
    const index = Number(req.params.index);

    if (!Number.isInteger(index) || index < 0) {
      res
        .status(400)
        .json({ message: "Address index must be a non-negative integer" });
      return;
    }

    const profile = await deleteAddressByIndex(req.user!.userId, index);
    res.status(200).json({ message: "Address deleted", profile });
  } catch (error: any) {
    res.status(400).json({
      message: "Failed to delete address",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
