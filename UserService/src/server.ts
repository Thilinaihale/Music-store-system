import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/user.routes.js";
import swaggerDocument from "./swagger.js";
import { customCss, customJsStr } from "./swagger-custom.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || "5000";

// Connect to MongoDB
connectDB();

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send("User service is healthy");
});

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss,
  customJsStr,
  customSiteTitle: "User Service API",
} as any));

//routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`User service is running on port ${PORT}`);
});

export default app;
