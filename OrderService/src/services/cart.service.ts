import Cart from "../models/cart.model.js";

interface CartItemDTO {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

type CartItemShape = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

export async function getUserCart(userId: string) {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return { userId, items: [] };
  }
  return cart;
}

export async function addItemToCart(userId: string, item: CartItemDTO) {
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $setOnInsert: { userId } },
    { upsert: true, new: true },
  );

  if (!cart) {
    throw new Error("Failed to initialize cart");
  }

  const existingItem = (cart.items as CartItemShape[]).find(
    (entry: CartItemShape) => entry.productId === item.productId,
  );

  if (existingItem) {
    existingItem.quantity += item.quantity;
    existingItem.unitPrice = item.unitPrice;
    existingItem.name = item.name;
  } else {
    cart.items.push(item);
  }

  await cart.save();
  return cart;
}

export async function updateCartItem(
  userId: string,
  productId: string,
  quantity: number,
) {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = (cart.items as CartItemShape[]).find(
    (entry: CartItemShape) => entry.productId === productId,
  );
  if (!item) {
    throw new Error("Cart item not found");
  }

  if (quantity <= 0) {
    cart.items = (cart.items as CartItemShape[]).filter(
      (entry: CartItemShape) => entry.productId !== productId,
    );
  } else {
    item.quantity = quantity;
  }

  await cart.save();
  return cart;
}

export async function removeCartItem(userId: string, productId: string) {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = (cart.items as CartItemShape[]).filter(
    (entry: CartItemShape) => entry.productId !== productId,
  );
  await cart.save();
  return cart;
}

export async function clearCart(userId: string) {
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $set: { items: [] } },
    { new: true },
  );

  if (!cart) {
    return { userId, items: [] };
  }

  return cart;
}
