import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import {
  addItemToCart,
  clearCart,
  getUserCart,
  removeCartItem,
  updateCartItem,
} from "../services/cart.service.js";

export async function getCartHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const cart = await getUserCart(req.user!.userId);
    res.status(200).json({ cart });
  } catch (error) {
    res.status(400).json({
      message: "Failed to fetch cart",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function addItemHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const quantity = Number(req.body.quantity);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      res.status(400).json({ message: "quantity must be a positive integer" });
      return;
    }

    const cart = await addItemToCart(req.user!.userId, {
      productId: req.body.productId,
      name: req.body.name,
      quantity,
      unitPrice: Number(req.body.unitPrice),
    });

    res.status(200).json({ message: "Cart item added", cart });
  } catch (error) {
    res.status(400).json({
      message: "Failed to add item",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function updateItemHandler(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const quantity = Number(req.body.quantity);

    if (!Number.isInteger(quantity)) {
      res.status(400).json({ message: "quantity must be an integer" });
      return;
    }

    const cart = await updateCartItem(
      req.user!.userId,
      String(req.params.productId),
      quantity,
    );
    res.status(200).json({ message: "Cart item updated", cart });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update cart item",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function removeItemHandler(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const cart = await removeCartItem(
      req.user!.userId,
      String(req.params.productId),
    );
    res.status(200).json({ message: "Cart item removed", cart });
  } catch (error) {
    res.status(400).json({
      message: "Failed to remove cart item",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function clearCartHandler(
  req: AuthenticatedRequest,
  res: Response,
) {
  try {
    const cart = await clearCart(req.user!.userId);
    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    res.status(400).json({
      message: "Failed to clear cart",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
