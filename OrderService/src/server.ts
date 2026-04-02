import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import connectDB from "./config/db.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import swaggerDocument from "./swagger.js";
import { customCss, customJsStr } from "./swagger-custom.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || "4002";

connectDB();

app.get("/health", (_req, res) => {
  res.status(200).send("Order service is healthy");
});

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss,
  customJsStr,
  customSiteTitle: "Order Service API",
} as any));

app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Order service is running on port ${PORT}`);
});

export default app;
