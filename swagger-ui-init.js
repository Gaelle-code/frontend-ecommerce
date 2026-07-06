
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "info": {
      "title": "Ecomus Professional E-Commerce API",
      "version": "1.2.0",
      "description": "\n## Ecomus Professional REST API\nA professional-grade e-commerce backend featuring:\n- 🔐 **Auth**: JWT-based Secure Authentication (User/Admin roles)\n- 📂 **Categories**: Dynamic Category management with professional CRUD\n- 🛍️ **Products**: Multi-variant products with relational category mapping\n- ☁️ **Images**: Cloudinary-powered image hosting and optimization\n- 🛒 **Cart & Checkout**: Atomic stock-aware purchase flow via `POST /buy`\n- 📜 **Audit Logs**: Comprehensive administrative action tracking\n- 🔧 **Admin**: Full administrative control over system data\n      ",
      "contact": {
        "name": "Ecomus Dev Team"
      }
    },
    "servers": [
      {
        "url": "http://localhost:3000",
        "description": "Development server"
      }
    ],
    "components": {
      "securitySchemes": {
        "BearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "description": "Enter your JWT token"
        }
      },
      "schemas": {
        "RegisterRequest": {
          "type": "object",
          "required": [
            "email",
            "password"
          ],
          "properties": {
            "email": {
              "type": "string",
              "format": "email",
              "example": "user@example.com"
            },
            "password": {
              "type": "string",
              "minLength": 6,
              "example": "secret123"
            },
            "role": {
              "type": "string",
              "enum": [
                "USER",
                "SELLER"
              ],
              "default": "USER"
            }
          }
        },
        "LoginRequest": {
          "type": "object",
          "required": [
            "email",
            "password"
          ],
          "properties": {
            "email": {
              "type": "string",
              "format": "email",
              "example": "admin@admin.com"
            },
            "password": {
              "type": "string",
              "example": "admin123"
            }
          }
        },
        "AuthResponse": {
          "type": "object",
          "properties": {
            "success": {
              "type": "boolean",
              "example": true
            },
            "token": {
              "type": "string"
            },
            "user": {
              "$ref": "#/components/schemas/User"
            }
          }
        },
        "User": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "role": {
              "type": "string",
              "enum": [
                "USER",
                "ADMIN",
                "SELLER"
              ]
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "ProductCreateRequest": {
          "type": "object",
          "required": [
            "name",
            "categoryId",
            "price",
            "stock"
          ],
          "properties": {
            "name": {
              "type": "string",
              "example": "Sony Wireless Headphones"
            },
            "description": {
              "type": "string",
              "example": "High quality noise-canceling"
            },
            "categoryId": {
              "type": "string",
              "example": "60d5ec49f1b2c8a1234567ab"
            },
            "brand": {
              "type": "string",
              "example": "Sony"
            },
            "price": {
              "type": "number",
              "example": 299.99
            },
            "stock": {
              "type": "integer",
              "example": 15
            },
            "variants": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Variant"
              }
            },
            "images": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/File"
              }
            }
          }
        },
        "ProductUpdateRequest": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "categoryId": {
              "type": "string"
            },
            "brand": {
              "type": "string"
            },
            "price": {
              "type": "number"
            },
            "stock": {
              "type": "integer"
            }
          }
        },
        "Product": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "categoryId": {
              "type": "string"
            },
            "category": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                }
              }
            },
            "brand": {
              "type": "string"
            },
            "price": {
              "type": "number"
            },
            "stock": {
              "type": "integer"
            },
            "orderCount": {
              "type": "integer"
            },
            "variants": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Variant"
              }
            },
            "images": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/File"
              }
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "CategoryRequest": {
          "type": "object",
          "required": [
            "name"
          ],
          "properties": {
            "name": {
              "type": "string",
              "example": "Electronics"
            },
            "description": {
              "type": "string",
              "example": "Gadgets, appliances, and more"
            }
          }
        },
        "Category": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "BuyRequest": {
          "type": "object",
          "required": [
            "productId",
            "quantity"
          ],
          "properties": {
            "productId": {
              "type": "string",
              "example": "60d5ec49f1b2c8a1234567ab"
            },
            "variantId": {
              "type": "string",
              "example": "60d5ec49f1b2c8a1234567cd"
            },
            "quantity": {
              "type": "integer",
              "minimum": 1,
              "example": 1
            }
          }
        },
        "Order": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "userId": {
              "type": "string"
            },
            "total": {
              "type": "number"
            },
            "status": {
              "type": "string",
              "enum": [
                "PENDING",
                "PAID",
                "SHIPPED",
                "DELIVERED",
                "CANCELLED"
              ]
            },
            "items": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/OrderItem"
              }
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "OrderItem": {
          "type": "object",
          "properties": {
            "productId": {
              "type": "string"
            },
            "variantId": {
              "type": "string"
            },
            "quantity": {
              "type": "integer"
            },
            "price": {
              "type": "number"
            }
          }
        },
        "Variant": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "color": {
              "type": "string"
            },
            "size": {
              "type": "string"
            },
            "sku": {
              "type": "string"
            },
            "price": {
              "type": "number"
            },
            "stock": {
              "type": "integer"
            }
          }
        },
        "File": {
          "type": "object",
          "properties": {
            "url": {
              "type": "string"
            },
            "format": {
              "type": "string"
            },
            "size": {
              "type": "integer"
            }
          }
        },
        "SuccessResponse": {
          "type": "object",
          "properties": {
            "success": {
              "type": "boolean",
              "example": true
            },
            "message": {
              "type": "string"
            },
            "data": {
              "type": "object"
            }
          }
        },
        "ErrorResponse": {
          "type": "object",
          "properties": {
            "success": {
              "type": "boolean",
              "example": false
            },
            "message": {
              "type": "string"
            },
            "errors": {
              "type": "array",
              "items": {
                "type": "object"
              }
            }
          }
        },
        "ProductSearchResponse": {
          "type": "object",
          "properties": {
            "success": {
              "type": "boolean",
              "example": true
            },
            "message": {
              "type": "string"
            },
            "data": {
              "type": "object",
              "properties": {
                "grouped": {
                  "type": "object",
                  "properties": {
                    "under50": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Product"
                      }
                    },
                    "between50And150": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Product"
                      }
                    },
                    "over150": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Product"
                      }
                    }
                  }
                },
                "total": {
                  "type": "integer"
                },
                "all": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            }
          }
        },
        "PaginatedResponse": {
          "type": "object",
          "properties": {
            "success": {
              "type": "boolean",
              "example": true
            },
            "data": {
              "type": "array",
              "items": {
                "type": "object"
              }
            },
            "pagination": {
              "type": "object",
              "properties": {
                "page": {
                  "type": "integer"
                },
                "limit": {
                  "type": "integer"
                },
                "total": {
                  "type": "integer"
                },
                "pages": {
                  "type": "integer"
                }
              }
            }
          }
        }
      }
    },
    "tags": [
      {
        "name": "Admin Routes",
        "description": "Restricted administrative privileges"
      },
      {
        "name": "User Routes",
        "description": "Authenticated actions for standard users"
      },
      {
        "name": "Open Routes",
        "description": "Free-access public endpoints"
      },
      {
        "name": "Auth",
        "description": "Identity management"
      },
      {
        "name": "Categories",
        "description": "Dynamic categorization"
      },
      {
        "name": "Products",
        "description": "Inventory management"
      },
      {
        "name": "Orders",
        "description": "Transaction processing"
      },
      {
        "name": "Cart",
        "description": "Shopping cart"
      }
    ],
    "paths": {
      "/api/auth/users/register": {
        "post": {
          "tags": [
            "Open Routes"
          ],
          "summary": "Register a new user",
          "description": "Create a new account. Role defaults to USER. SELLER can be self-registered; ADMIN must be assigned by an existing admin.",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RegisterRequest"
                },
                "examples": {
                  "user": {
                    "summary": "Regular user",
                    "value": {
                      "email": "alice@example.com",
                      "password": "secret123"
                    }
                  },
                  "seller": {
                    "summary": "Seller account",
                    "value": {
                      "email": "seller@example.com",
                      "password": "secret123",
                      "role": "SELLER"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Registration successful",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AuthResponse"
                  }
                }
              }
            },
            "409": {
              "description": "Email already in use",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "422": {
              "description": "Validation error"
            }
          }
        }
      },
      "/api/auth/users/login": {
        "post": {
          "tags": [
            "Auth"
          ],
          "summary": "Login",
          "description": "Authenticate and receive a JWT token. Use the token in the Authorization header as `Bearer <token>`.",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginRequest"
                },
                "examples": {
                  "admin": {
                    "summary": "Admin (after seeding)",
                    "value": {
                      "email": "admin@ecomus.com",
                      "password": "Admin@1234"
                    }
                  },
                  "user": {
                    "summary": "Sample user (after seeding)",
                    "value": {
                      "email": "john@example.com",
                      "password": "User@1234"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Login successful",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AuthResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Invalid credentials"
            }
          }
        }
      },
      "/api/auth/users/me": {
        "get": {
          "tags": [
            "Auth"
          ],
          "summary": "Get current user profile",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "user": {
                        "$ref": "#/components/schemas/User"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/auth/cart": {
        "get": {
          "tags": [
            "Cart"
          ],
          "summary": "View my shopping cart",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Success"
            }
          }
        },
        "delete": {
          "tags": [
            "Cart"
          ],
          "summary": "Clear entire cart",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Success"
            }
          }
        }
      },
      "/api/auth/cart/items": {
        "post": {
          "tags": [
            "Cart"
          ],
          "summary": "Add product variant to cart",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "productId",
                    "variantId",
                    "quantity"
                  ],
                  "properties": {
                    "productId": {
                      "type": "string"
                    },
                    "variantId": {
                      "type": "string"
                    },
                    "quantity": {
                      "type": "integer",
                      "minimum": 1,
                      "default": 1
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success"
            }
          }
        }
      },
      "/api/auth/cart/items/{itemId}": {
        "patch": {
          "tags": [
            "Cart"
          ],
          "summary": "Update item quantity in cart",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "itemId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "quantity": {
                      "type": "integer",
                      "minimum": 1
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success"
            }
          }
        },
        "delete": {
          "tags": [
            "Cart"
          ],
          "summary": "Remove item from cart",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "itemId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success"
            }
          }
        }
      },
      "/api/categories": {
        "get": {
          "summary": "Fetch all categories",
          "tags": [
            "Categories"
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success"
            }
          }
        },
        "post": {
          "summary": "Create a new category (Admin)",
          "tags": [
            "Categories"
          ],
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CategoryRequest"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Created"
            }
          }
        }
      },
      "/api/categories/{id}": {
        "put": {
          "summary": "Update an existing category (Admin)",
          "tags": [
            "Categories"
          ],
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CategoryRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success"
            }
          }
        },
        "delete": {
          "summary": "Remove a category (Admin)",
          "tags": [
            "Categories"
          ],
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success"
            }
          }
        }
      },
      "/api/auth/orders/buy": {
        "post": {
          "tags": [
            "Orders"
          ],
          "summary": "Buy a single product now (Skip cart)",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BuyRequest"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Order placed",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Order"
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden (e.g. Admin cannot order)"
            }
          }
        }
      },
      "/api/auth/orders": {
        "post": {
          "tags": [
            "Orders"
          ],
          "summary": "Place order from Cart",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "201": {
              "description": "Success"
            }
          }
        },
        "get": {
          "tags": [
            "Orders"
          ],
          "summary": "Get my purchase history",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "status",
              "schema": {
                "type": "string",
                "enum": [
                  "PENDING",
                  "PAID",
                  "SHIPPED",
                  "DELIVERED",
                  "CANCELLED"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PaginatedResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/api/auth/orders/admin/all": {
        "get": {
          "tags": [
            "Admin Routes"
          ],
          "summary": "See all system orders (Admin)",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Success"
            }
          }
        }
      },
      "/api/auth/orders/{id}": {
        "get": {
          "tags": [
            "Orders"
          ],
          "summary": "Get order details",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success"
            }
          }
        }
      },
      "/api/auth/orders/{id}/status": {
        "patch": {
          "tags": [
            "Admin Routes"
          ],
          "summary": "Update order status (Admin)",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "enum": [
                        "PENDING",
                        "PAID",
                        "SHIPPED",
                        "DELIVERED",
                        "CANCELLED"
                      ]
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success"
            }
          }
        }
      },
      "/api/admin/products": {
        "post": {
          "tags": [
            "Admin Routes"
          ],
          "summary": "Create a newly simplistic product",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProductCreateRequest"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Created"
            }
          }
        }
      },
      "/api/admin/products/{id}": {
        "patch": {
          "tags": [
            "Admin Routes"
          ],
          "summary": "Update an existing product",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProductUpdateRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Updated"
            }
          }
        },
        "delete": {
          "tags": [
            "Admin Routes"
          ],
          "summary": "Delete a product",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Deleted"
            }
          }
        }
      },
      "/api/public/products": {
        "get": {
          "tags": [
            "Open Routes"
          ],
          "summary": "List all products (Open API)",
          "responses": {
            "200": {
              "description": "List of products grouped by price",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ProductSearchResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/api/public/products/category/{categoryId}": {
        "get": {
          "tags": [
            "Open Routes"
          ],
          "summary": "Get products by category",
          "parameters": [
            {
              "in": "path",
              "name": "categoryId",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 12
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PaginatedResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/api/public/products/{id}": {
        "get": {
          "tags": [
            "Open Routes"
          ],
          "summary": "Get a single product with nested data",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Product detail returned entirely",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "message": {
                        "type": "string"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "product": {
                            "$ref": "#/components/schemas/Product"
                          },
                          "avgRating": {
                            "type": "number"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.preauthorizeApiKey) {
    const key = customOptions.preauthorizeApiKey.authDefinitionKey;
    const value = customOptions.preauthorizeApiKey.apiKeyValue;
    if (!!key && !!value) {
      const pid = setInterval(() => {
        const authorized = ui.preauthorizeApiKey(key, value);
        if(!!authorized) clearInterval(pid);
      }, 500)

    }
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
