const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Delivery Service API",
    version: "1.0.0",
    description: "Delivery tracking and management microservice. Running natively on port 4003.",
  },
  servers: [{ url: "http://localhost:4003" }],
  tags: [{ name: "Deliveries" }],
  components: {
    schemas: {
      DeliveryCreateRequest: {
        type: "object",
        required: ["orderId", "userId"],
        properties: {
          orderId: { type: "string", example: "67e6c1f59d2f8c8e5a6f2001" },
          userId: { type: "string", example: "67e6afef9d2f8c8e5a6f0ff1" },
          carrier: { type: "string", example: "DHL" },
          trackingNumber: { type: "string", example: "DHL-TRACK-123456" },
          estimatedDeliveryDate: { type: "string", format: "date-time", example: "2026-04-02T09:00:00.000Z" },
          notes: { type: "string", example: "Handle with care" },
        },
      },
      DeliveryUpdateRequest: {
        type: "object",
        properties: {
          carrier: { type: "string", example: "FedEx" },
          trackingNumber: { type: "string", example: "FDX-909090" },
          status: { type: "string", enum: ["pending_pickup", "in_transit", "delivered"], example: "in_transit" },
          estimatedDeliveryDate: { type: "string", format: "date-time", example: "2026-04-03T12:00:00.000Z" },
          notes: { type: "string", example: "Out for delivery" },
        },
      },
    },
  },
  paths: {
    "/api/deliveries": {
      get: { tags: ["Deliveries"], summary: "List deliveries", responses: { "200": { description: "Deliveries list" } } },
      post: {
        tags: ["Deliveries"], summary: "Create delivery",
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/DeliveryCreateRequest" } } } },
        responses: { "201": { description: "Delivery created" } },
      },
    },
    "/api/deliveries/order/{orderId}": {
      get: {
        tags: ["Deliveries"], summary: "Get delivery by order id",
        parameters: [{ in: "path", name: "orderId", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Delivery detail" } },
      },
      put: {
        tags: ["Deliveries"], summary: "Update delivery",
        parameters: [{ in: "path", name: "orderId", required: true, schema: { type: "string" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/DeliveryUpdateRequest" } } } },
        responses: { "200": { description: "Delivery updated" } },
      },
      delete: {
        tags: ["Deliveries"], summary: "Delete delivery",
        parameters: [{ in: "path", name: "orderId", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Delivery deleted" } },
      },
    },
  },
};

export default swaggerDocument;
