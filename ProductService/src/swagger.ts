const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Product Service API",
    version: "1.0.0",
    description: "Product catalog management microservice. Running natively on port 4001.",
  },
  servers: [{ url: "http://localhost:4001" }],
  tags: [{ name: "Products" }],
  components: {
    schemas: {
      ProductCreateRequest: {
        type: "object",
        required: ["name", "brand", "category", "price", "stock"],
        properties: {
          name: { type: "string", example: "Yamaha Acoustic Guitar" },
          brand: { type: "string", example: "Yamaha" },
          category: { type: "string", enum: ["strings", "percussion", "keyboard", "wind", "brass", "accessories"], example: "strings" },
          price: { type: "number", example: 750.0 },
          stock: { type: "integer", example: 15 },
          images: { type: "array", items: { type: "string" }, example: ["https://example.com/guitar-front.jpg"] },
          description: { type: "string", example: "Solid spruce top acoustic guitar" },
        },
      },
      ProductUpdateRequest: {
        type: "object",
        properties: {
          name: { type: "string", example: "Yamaha Acoustic Guitar F310" },
          brand: { type: "string", example: "Yamaha" },
          category: { type: "string", enum: ["strings", "percussion", "keyboard", "wind", "brass", "accessories"], example: "strings" },
          price: { type: "number", example: 800.0 },
          stock: { type: "integer", example: 12 },
          images: { type: "array", items: { type: "string" }, example: ["https://example.com/guitar-front-v2.jpg"] },
          description: { type: "string", example: "Updated model description" },
          isActive: { type: "boolean", example: true },
        },
      },
      StockDecreaseRequest: {
        type: "object",
        required: ["quantity"],
        properties: {
          quantity: { type: "integer", example: 1 },
        },
      },
    },
  },
  paths: {
    "/api/products": {
      get: { tags: ["Products"], summary: "List products", responses: { "200": { description: "Products list" } } },
      post: {
        tags: ["Products"], summary: "Create product",
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/ProductCreateRequest" } } } },
        responses: { "201": { description: "Product created" } },
      },
    },
    "/api/products/{id}": {
      get: {
        tags: ["Products"], summary: "Get product by id",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Product detail" } },
      },
      put: {
        tags: ["Products"], summary: "Update product",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/ProductUpdateRequest" } } } },
        responses: { "200": { description: "Product updated" } },
      },
      delete: {
        tags: ["Products"], summary: "Delete product",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Product deleted" } },
      },
    },
    "/api/products/{id}/stock/decrease": {
      patch: {
        tags: ["Products"], summary: "Decrease product stock",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/StockDecreaseRequest" } } } },
        responses: { "200": { description: "Stock decreased" } },
      },
    },
  },
};

export default swaggerDocument;
