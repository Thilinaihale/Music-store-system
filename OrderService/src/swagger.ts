const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Order Service API",
    version: "1.0.0",
    description: "Shopping cart and order management microservice. Running natively on port 4002.",
  },
  servers: [{ url: "http://localhost:4002" }],
  tags: [{ name: "Cart" }, { name: "Orders" }],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
    schemas: {
      CartItemAddRequest: {
        type: "object",
        required: ["productId", "name", "quantity", "unitPrice"],
        properties: {
          productId: { type: "string", example: "67e6b09d9d2f8c8e5a6f1001" },
          name: { type: "string", example: "Yamaha Acoustic Guitar" },
          quantity: { type: "integer", example: 1 },
          unitPrice: { type: "number", example: 750.0 },
        },
      },
      CartItemUpdateRequest: {
        type: "object",
        required: ["quantity"],
        properties: {
          quantity: { type: "integer", example: 2 },
        },
      },
      PlaceOrderRequest: {
        type: "object",
        required: ["shippingAddress"],
        properties: {
          shippingAddress: {
            type: "object",
            required: ["street", "city", "province", "zipCode", "country"],
            properties: {
              street: { type: "string", example: "123 Main St" },
              city: { type: "string", example: "Colombo" },
              province: { type: "string", example: "Western" },
              zipCode: { type: "string", example: "00100" },
              country: { type: "string", example: "Sri Lanka" },
            },
          },
        },
      },
      UpdateOrderStatusRequest: {
        type: "object",
        required: ["status"],
        properties: {
          status: { type: "string", enum: ["pending", "shipped", "delivered"], example: "shipped" },
        },
      },
    },
  },
  paths: {
    "/api/cart": {
      get: { tags: ["Cart"], summary: "Get cart", security: [{ bearerAuth: [] }], responses: { "200": { description: "Cart details" } } },
      delete: { tags: ["Cart"], summary: "Clear cart", security: [{ bearerAuth: [] }], responses: { "200": { description: "Cart cleared" } } },
    },
    "/api/cart/items": {
      post: {
        tags: ["Cart"], summary: "Add cart item", security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CartItemAddRequest" } } } },
        responses: { "200": { description: "Item added" } },
      },
    },
    "/api/cart/items/{productId}": {
      put: {
        tags: ["Cart"], summary: "Update cart item", security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "productId", required: true, schema: { type: "string" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CartItemUpdateRequest" } } } },
        responses: { "200": { description: "Item updated" } },
      },
      delete: {
        tags: ["Cart"], summary: "Remove cart item", security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "productId", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Item removed" } },
      },
    },
    "/api/orders": {
      post: {
        tags: ["Orders"], summary: "Place order", security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/PlaceOrderRequest" } } } },
        responses: { "201": { description: "Order placed" } },
      },
    },
    "/api/orders/me": {
      get: { tags: ["Orders"], summary: "Get current user orders", security: [{ bearerAuth: [] }], responses: { "200": { description: "Orders list" } } },
    },
    "/api/orders/{orderId}/status": {
      patch: {
        tags: ["Orders"], summary: "Update order status", security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "orderId", required: true, schema: { type: "string" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateOrderStatusRequest" } } } },
        responses: { "200": { description: "Order updated" } },
      },
    },
  },
};

export default swaggerDocument;
