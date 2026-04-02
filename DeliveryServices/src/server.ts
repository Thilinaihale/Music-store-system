import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import connectDB from "./config/db.js";
import deliveryRoutes from "./routes/delivery.routes.js";
import swaggerDocument from "./swagger.js";
import { customCss, customJsStr } from "./swagger-custom.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || "4003";

connectDB();

app.get("/health", (_req, res) => {
  res.status(200).send("Delivery service is healthy");
});

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss,
  customJsStr,
  customSiteTitle: "Delivery Service API",
} as any));

app.use("/api/deliveries", deliveryRoutes);

app.listen(PORT, () => {
  console.log(`Delivery service is running on port ${PORT}`);
});

export default app;
