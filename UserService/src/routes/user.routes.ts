//all the user related routes will be defined here

import express from "express";
import {
  addAddress,
  deleteAddress,
  getProfile,
  login,
  register,
  updateAddress,
  updateProfile,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

//register route
router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);

router.post("/profile/addresses", verifyToken, addAddress);
router.put("/profile/addresses/:index", verifyToken, updateAddress);
router.delete("/profile/addresses/:index", verifyToken, deleteAddress);

export default router;
