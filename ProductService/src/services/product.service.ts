import Product, { type ProductCategory } from "../models/product.model.js";

export interface CreateProductDTO {
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  stock: number;
  images?: string[];
  description?: string;
}

export interface UpdateProductDTO {
  name?: string;
  brand?: string;
  category?: ProductCategory;
  price?: number;
  stock?: number;
  images?: string[];
  description?: string;
  isActive?: boolean;
}

interface QueryDTO {
  search?: string;
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "createdAt" | "name";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export async function createProduct(payload: CreateProductDTO) {
  const product = await Product.create(payload);
  return product;
}

export async function listProducts(query: QueryDTO) {
  const {
    search,
    category,
    minPrice,
    maxPrice,
    sortBy = "createdAt",
    order = "desc",
    page = 1,
    limit = 10,
  } = query;

  const filter: Record<string, unknown> = { isActive: true };

  if (search) {
    filter.$text = { $search: search };
  }

  if (category) {
    filter.category = category;
  }

  if (typeof minPrice === "number" || typeof maxPrice === "number") {
    filter.price = {};
    if (typeof minPrice === "number") {
      (filter.price as Record<string, number>).$gte = minPrice;
    }
    if (typeof maxPrice === "number") {
      (filter.price as Record<string, number>).$lte = maxPrice;
    }
  }

  const skip = (page - 1) * limit;
  const sortOrder = order === "asc" ? 1 : -1;

  const [items, total] = await Promise.all([
    Product.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit),
    Product.countDocuments(filter),
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getProductById(id: string) {
  return Product.findById(id);
}

export async function updateProduct(id: string, payload: UpdateProductDTO) {
  return Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
}

export async function deleteProduct(id: string) {
  return Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
}

export async function decreaseStock(id: string, quantity: number) {
  const product = await Product.findOneAndUpdate(
    { _id: id, stock: { $gte: quantity }, isActive: true },
    { $inc: { stock: -quantity } },
    { new: true },
  );

  if (!product) {
    throw new Error("Insufficient stock or product unavailable");
  }

  return product;
}
