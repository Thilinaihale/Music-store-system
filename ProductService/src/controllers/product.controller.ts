import type { Request, Response } from "express";
import {
  createProduct,
  decreaseStock,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "../services/product.service.js";

function toNumber(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

export async function createProductHandler(req: Request, res: Response) {
  try {
    const product = await createProduct(req.body);
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function listProductsHandler(req: Request, res: Response) {
  try {
    const result = await listProducts({
      search:
        typeof req.query.search === "string" ? req.query.search : undefined,
      category:
        typeof req.query.category === "string"
          ? (req.query.category as "string" | "percussion" | "keyboard")
          : undefined,
      minPrice: toNumber(req.query.minPrice),
      maxPrice: toNumber(req.query.maxPrice),
      sortBy:
        typeof req.query.sortBy === "string"
          ? (req.query.sortBy as "price" | "createdAt" | "name")
          : undefined,
      order:
        typeof req.query.order === "string"
          ? (req.query.order as "asc" | "desc")
          : undefined,
      page: toNumber(req.query.page),
      limit: toNumber(req.query.limit),
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: "Failed to list products",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function getProductByIdHandler(req: Request, res: Response) {
  try {
    const product = await getProductById(String(req.params.id));
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({
      message: "Failed to fetch product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function updateProductHandler(req: Request, res: Response) {
  try {
    const product = await updateProduct(String(req.params.id), req.body);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function deleteProductHandler(req: Request, res: Response) {
  try {
    const product = await deleteProduct(String(req.params.id));
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product deleted", product });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function decreaseStockHandler(req: Request, res: Response) {
  try {
    const quantity = Number(req.body.quantity);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      res.status(400).json({ message: "quantity must be a positive integer" });
      return;
    }

    const product = await decreaseStock(String(req.params.id), quantity);
    res.status(200).json({ message: "Stock updated", product });
  } catch (error) {
    res.status(400).json({
      message: "Failed to decrease stock",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
