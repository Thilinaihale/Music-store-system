import axios from "axios";
import Cart from "../models/cart.model.js";
import Order, { type OrderStatus } from "../models/order.model.js";

interface ShippingAddressDTO {
  street: string;
  city: string;
  province: string;
  zipCode: string;
  country: string;
}

type OrderLineItem = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

export async function placeOrder(
  userId: string,
  shippingAddress: ShippingAddressDTO,
) {
  const cart = await Cart.findOne({ userId });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const productServiceUrl =
    process.env.PRODUCT_SERVICE_URL || "http://productservice:4001";

  for (const item of cart.items) {
    await axios.patch(
      `${productServiceUrl}/api/products/${item.productId}/stock/decrease`,
      { quantity: item.quantity },
      { timeout: 5000 },
    );
  }

  const totalAmount = (cart.items as OrderLineItem[]).reduce(
    (acc: number, item: OrderLineItem) => acc + item.unitPrice * item.quantity,
    0,
  );

  const order = await Order.create({
    userId,
    items: cart.items,
    totalAmount,
    shippingAddress,
    status: "pending",
  });

  cart.items = [];
  await cart.save();

  return order;
}

export async function getUserOrders(userId: string) {
  return Order.find({ userId }).sort({ createdAt: -1 });
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { $set: { status } },
    { new: true, runValidators: true },
  );

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
}
