import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.js";
import { customCss, customJsStr } from "./swagger-custom.js";

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || "3000";
const userServiceUrl =
  process.env.USER_SERVICE_URL || "http://userservice:4000";
const productServiceUrl =
  process.env.PRODUCT_SERVICE_URL || "http://productservice:4001";
const orderServiceUrl =
  process.env.ORDER_SERVICE_URL || "http://orderservice:4002";
const deliveryServiceUrl =
  process.env.DELIVERY_SERVICE_URL || "http://deliveryservice:4003";

app.get("/health", (_req, res) => {
  res.status(200).send("API Gateway is healthy");
});

// Swagger docs
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCss,
    customJsStr,
    customSiteTitle: "Music Store API Gateway",
  } as any),
);
app.get("/api-docs.json", (_req, res) => {
  res.status(200).json(swaggerDocument);
});

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: `${userServiceUrl}/api/auth`,
    changeOrigin: true,
  }),
);

app.use(
  "/api/products",
  createProxyMiddleware({
    target: `${productServiceUrl}/api/products`,
    changeOrigin: true,
  }),
);

app.use(
  "/api/cart",
  createProxyMiddleware({
    target: `${orderServiceUrl}/api/cart`,
    changeOrigin: true,
  }),
);

app.use(
  "/api/orders",
  createProxyMiddleware({
    target: `${orderServiceUrl}/api/orders`,
    changeOrigin: true,
  }),
);

app.use(
  "/api/deliveries",
  createProxyMiddleware({
    target: `${deliveryServiceUrl}/api/deliveries`,
    changeOrigin: true,
  }),
);

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});

export default app;
