const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Music Store Microservices API",
    version: "1.0.0",
    description:
      "Gateway-level API documentation for User, Product, Order, and Delivery services.",
  },
  servers: [{ url: "http://localhost:3000" }],
  tags: [
    { name: "Auth" },
    { name: "Products" },
    { name: "Cart" },
    { name: "Orders" },
    { name: "Deliveries" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      RegisterRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string", example: "John Doe" },
          email: {
            type: "string",
            format: "email",
            example: "john@example.com",
          },
          password: { type: "string", example: "Pass1234" },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "john@example.com",
          },
          password: { type: "string", example: "Pass1234" },
        },
      },
      UpdateProfileRequest: {
        type: "object",
        properties: {
          name: { type: "string", example: "John Updated" },
          phone: { type: "string", example: "+94771234567" },
        },
      },
      AddressRequest: {
        type: "object",
        required: ["street", "city", "province", "zipCode", "country"],
        properties: {
          label: { type: "string", example: "Home" },
          street: { type: "string", example: "123 Main St" },
          city: { type: "string", example: "Colombo" },
          province: { type: "string", example: "Western" },
          zipCode: { type: "string", example: "00100" },
          country: { type: "string", example: "Sri Lanka" },
        },
      },
      ProductCreateRequest: {
        type: "object",
        required: ["name", "brand", "category", "price", "stock"],
        properties: {
          name: { type: "string", example: "Yamaha Acoustic Guitar" },
          brand: { type: "string", example: "Yamaha" },
          category: {
            type: "string",
            enum: ["strings", "percussion", "keyboard", "wind", "brass", "accessories"],
            example: "strings",
          },
          price: { type: "number", example: 750.0 },
          stock: { type: "integer", example: 15 },
          images: {
            type: "array",
            items: { type: "string" },
            example: ["https://example.com/guitar-front.jpg"],
          },
          description: {
            type: "string",
            example: "Solid spruce top acoustic guitar",
          },
        },
      },
      ProductUpdateRequest: {
        type: "object",
        properties: {
          name: { type: "string", example: "Yamaha Acoustic Guitar F310" },
          brand: { type: "string", example: "Yamaha" },
          category: {
            type: "string",
            enum: ["strings", "percussion", "keyboard", "wind", "brass", "accessories"],
            example: "strings",
          },
          price: { type: "number", example: 800.0 },
          stock: { type: "integer", example: 12 },
          images: {
            type: "array",
            items: { type: "string" },
            example: ["https://example.com/guitar-front-v2.jpg"],
          },
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
          status: {
            type: "string",
            enum: ["pending", "shipped", "delivered"],
            example: "shipped",
          },
        },
      },
      DeliveryCreateRequest: {
        type: "object",
        required: ["orderId", "userId"],
        properties: {
          orderId: { type: "string", example: "67e6c1f59d2f8c8e5a6f2001" },
          userId: { type: "string", example: "67e6afef9d2f8c8e5a6f0ff1" },
          carrier: { type: "string", example: "DHL" },
          trackingNumber: { type: "string", example: "DHL-TRACK-123456" },
          estimatedDeliveryDate: {
            type: "string",
            format: "date-time",
            example: "2026-04-02T09:00:00.000Z",
          },
          notes: { type: "string", example: "Handle with care" },
        },
      },
      DeliveryUpdateRequest: {
        type: "object",
        properties: {
          carrier: { type: "string", example: "FedEx" },
          trackingNumber: { type: "string", example: "FDX-909090" },
          status: {
            type: "string",
            enum: ["pending_pickup", "in_transit", "delivered"],
            example: "in_transit",
          },
          estimatedDeliveryDate: {
            type: "string",
            format: "date-time",
            example: "2026-04-03T12:00:00.000Z",
          },
          notes: { type: "string", example: "Out for delivery" },
        },
      },
    },
  },
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterRequest" },
            },
          },
        },
        responses: { "201": { description: "User registered" } },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: { "200": { description: "Login success" } },
      },
    },
    "/api/auth/profile": {
      get: {
        tags: ["Auth"],
        summary: "Get profile",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Profile details" } },
      },
      put: {
        tags: ["Auth"],
        summary: "Update profile",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UpdateProfileRequest" },
            },
          },
        },
        responses: { "200": { description: "Profile updated" } },
      },
    },
    "/api/auth/profile/addresses": {
      post: {
        tags: ["Auth"],
        summary: "Add profile address",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AddressRequest" },
            },
          },
        },
        responses: { "200": { description: "Address added" } },
      },
    },
    "/api/auth/profile/addresses/{index}": {
      put: {
        tags: ["Auth"],
        summary: "Update profile address",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "index",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AddressRequest" },
            },
          },
        },
        responses: { "200": { description: "Address updated" } },
      },
      delete: {
        tags: ["Auth"],
        summary: "Delete profile address",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "index",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: { "200": { description: "Address deleted" } },
      },
    },
    "/api/products": {
      get: {
        tags: ["Products"],
        summary: "List products",
        responses: { "200": { description: "Products list" } },
      },
      post: {
        tags: ["Products"],
        summary: "Create product",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProductCreateRequest" },
            },
          },
        },
        responses: { "201": { description: "Product created" } },
      },
    },
    "/api/products/{id}": {
      get: {
        tags: ["Products"],
        summary: "Get product by id",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { "200": { description: "Product detail" } },
      },
      put: {
        tags: ["Products"],
        summary: "Update product",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProductUpdateRequest" },
            },
          },
        },
        responses: { "200": { description: "Product updated" } },
      },
      delete: {
        tags: ["Products"],
        summary: "Delete product",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { "200": { description: "Product deleted" } },
      },
    },
    "/api/products/{id}/stock/decrease": {
      patch: {
        tags: ["Products"],
        summary: "Decrease product stock",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/StockDecreaseRequest" },
            },
          },
        },
        responses: { "200": { description: "Stock decreased" } },
      },
    },
    "/api/cart": {
      get: {
        tags: ["Cart"],
        summary: "Get cart",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Cart details" } },
      },
      delete: {
        tags: ["Cart"],
        summary: "Clear cart",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Cart cleared" } },
      },
    },
    "/api/cart/items": {
      post: {
        tags: ["Cart"],
        summary: "Add cart item",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CartItemAddRequest" },
            },
          },
        },
        responses: { "200": { description: "Item added" } },
      },
    },
    "/api/cart/items/{productId}": {
      put: {
        tags: ["Cart"],
        summary: "Update cart item",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "productId",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CartItemUpdateRequest" },
            },
          },
        },
        responses: { "200": { description: "Item updated" } },
      },
      delete: {
        tags: ["Cart"],
        summary: "Remove cart item",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "productId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { "200": { description: "Item removed" } },
      },
    },
    "/api/orders": {
      post: {
        tags: ["Orders"],
        summary: "Place order",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PlaceOrderRequest" },
            },
          },
        },
        responses: { "201": { description: "Order placed" } },
      },
    },
    "/api/orders/me": {
      get: {
        tags: ["Orders"],
        summary: "Get current user orders",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Orders list" } },
      },
    },
    "/api/orders/{orderId}/status": {
      patch: {
        tags: ["Orders"],
        summary: "Update order status",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "orderId",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UpdateOrderStatusRequest" },
            },
          },
        },
        responses: { "200": { description: "Order updated" } },
      },
    },
    "/api/deliveries": {
      get: {
        tags: ["Deliveries"],
        summary: "List deliveries",
        responses: { "200": { description: "Deliveries list" } },
      },
      post: {
        tags: ["Deliveries"],
        summary: "Create delivery",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/DeliveryCreateRequest" },
            },
          },
        },
        responses: { "201": { description: "Delivery created" } },
      },
    },
    "/api/deliveries/order/{orderId}": {
      get: {
        tags: ["Deliveries"],
        summary: "Get delivery by order id",
        parameters: [
          {
            in: "path",
            name: "orderId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { "200": { description: "Delivery detail" } },
      },
      put: {
        tags: ["Deliveries"],
        summary: "Update delivery",
        parameters: [
          {
            in: "path",
            name: "orderId",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/DeliveryUpdateRequest" },
            },
          },
        },
        responses: { "200": { description: "Delivery updated" } },
      },
      delete: {
        tags: ["Deliveries"],
        summary: "Delete delivery",
        parameters: [
          {
            in: "path",
            name: "orderId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { "200": { description: "Delivery deleted" } },
      },
    },
  },
};

export default swaggerDocument;
