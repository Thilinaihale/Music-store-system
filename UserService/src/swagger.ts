const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "User Service API",
    version: "1.0.0",
    description: "User authentication and profile management microservice. Running natively on port 4000.",
  },
  servers: [{ url: "http://localhost:4000" }],
  tags: [{ name: "Auth" }],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
    schemas: {
      RegisterRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string", example: "John Doe" },
          email: { type: "string", format: "email", example: "john@example.com" },
          password: { type: "string", example: "Pass1234" },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "john@example.com" },
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
    },
  },
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"], summary: "Register user",
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/RegisterRequest" } } } },
        responses: { "201": { description: "User registered" } },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"], summary: "Login user",
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/LoginRequest" } } } },
        responses: { "200": { description: "Login success" } },
      },
    },
    "/api/auth/profile": {
      get: {
        tags: ["Auth"], summary: "Get profile", security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Profile details" } },
      },
      put: {
        tags: ["Auth"], summary: "Update profile", security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateProfileRequest" } } } },
        responses: { "200": { description: "Profile updated" } },
      },
    },
    "/api/auth/profile/addresses": {
      post: {
        tags: ["Auth"], summary: "Add profile address", security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/AddressRequest" } } } },
        responses: { "200": { description: "Address added" } },
      },
    },
    "/api/auth/profile/addresses/{index}": {
      put: {
        tags: ["Auth"], summary: "Update profile address", security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "index", required: true, schema: { type: "integer" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/AddressRequest" } } } },
        responses: { "200": { description: "Address updated" } },
      },
      delete: {
        tags: ["Auth"], summary: "Delete profile address", security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "index", required: true, schema: { type: "integer" } }],
        responses: { "200": { description: "Address deleted" } },
      },
    },
  },
};

export default swaggerDocument;
