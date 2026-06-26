11 - Backend Architecture
1. Purpose

The backend is the single source of truth for the ecommerce platform.

It is responsible for executing all business logic, validating requests, enforcing security, managing data persistence, and exposing APIs consumed by both the customer application and the Admin Panel.

The backend never contains presentation logic.

2. Technology Stack

Backend Framework

Node.js

Language

TypeScript

Database

PostgreSQL

ORM

Prisma ORM

Authentication

JWT

Refresh Tokens

Validation

Zod

File Storage

Cloudinary

Logging

Pino

Testing

Vitest

Package Manager

pnpm
3. High-Level Architecture
Client App

↓

Admin App

↓

REST API

↓

Controllers

↓

Services

↓

Repositories

↓

Prisma ORM

↓

PostgreSQL

Every request follows exactly the same flow.

4. Folder Structure
backend/

src/

config/

controllers/

services/

repositories/

routes/

middlewares/

validators/

types/

utils/

lib/

prisma/

generated/

tests/

This structure separates responsibilities and keeps the codebase maintainable.

5. Request Lifecycle

Every request follows this sequence:

HTTP Request

↓

Route

↓

Middleware

↓

Controller

↓

Service

↓

Repository

↓

Prisma

↓

PostgreSQL

↓

Response

Business logic belongs only in the Service layer.

6. Responsibilities
Routes

Responsible for:

Defining endpoints
Applying middleware
Mapping requests to controllers

No business logic.

Controllers

Responsible for:

Reading request data
Calling services
Returning responses

Controllers should remain thin.

Services

Responsible for:

Business rules
Validation beyond schema
Transactions
Domain logic

Most application logic lives here.

Repositories

Responsible for:

Database queries
Prisma operations
Data persistence

Repositories know nothing about HTTP.

Prisma

Responsible for:

Database schema
Migrations
Query generation
Relationships
7. Feature Organization

Each domain follows the same pattern.

Example:

products/

products.controller.ts

products.service.ts

products.repository.ts

products.routes.ts

products.validation.ts

products.types.ts

Repeat for:

Auth
Profile
Orders
Reviews
Wishlist
Addresses
Checkout

This keeps each feature self-contained.

8. Middleware

Global middleware includes:

Authentication
Authorization
Request Validation
Error Handling
Logging
Rate Limiting
CORS
Helmet
Compression

Middleware should remain reusable and independent.

9. Error Handling

All errors return a consistent format.

Example:

{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email address."
  }
}

Avoid returning raw stack traces in production.

10. Validation Strategy

Every incoming request is validated.

Validation occurs before business logic.

Recommended flow:

Request

↓

Zod Schema

↓

Controller

↓

Service

Invalid requests never reach the service layer.

11. Transactions

Use database transactions for operations affecting multiple tables.

Examples:

Checkout
Order Creation
Refunds
Inventory Updates

This guarantees data consistency.

12. Dependency Rules

Higher layers may depend on lower layers.

Lower layers must never depend on higher layers.

Correct:

Controller

↓

Service

↓

Repository

Incorrect:

Repository

↓

Controller

This keeps the architecture clean and testable.

13. Shared Utilities

Shared modules include:

Date utilities
Currency formatting
Pagination helpers
API response helpers
Logger
Environment configuration

Avoid duplicating utility code across features.

14. Logging

Use structured logging.

Log:

Requests
Responses
Errors
Authentication events
Background jobs

Never log:

Passwords
Access tokens
Refresh tokens
Payment details
15. Background Jobs

Future background jobs include:

Email sending
Inventory synchronization
Order notifications
Payment reconciliation
Analytics aggregation

These should run independently of HTTP requests.

16. Scalability

The architecture supports:

Horizontal scaling
Multiple frontend applications
Worker processes
Job queues
Microservice migration (if ever needed)

The initial implementation remains a modular monolith.

17. Security

Security responsibilities include:

JWT validation
Role validation
Rate limiting
Input validation
SQL injection protection (via Prisma)
XSS prevention
CSRF strategy (if cookie-based auth is used)
18. Coding Standards

General rules:

One responsibility per function.
No business logic in controllers.
No database queries in controllers.
Prefer dependency injection where appropriate.
Use async/await consistently.
Strong typing everywhere.

These conventions should be followed across all modules.

19. Future Improvements

The architecture can evolve to support:

Event-driven workflows
Message queues (BullMQ, RabbitMQ)
WebSockets
Search indexing
Caching with Redis
Multi-region deployment
Multi-tenant architecture

These enhancements can be introduced without redesigning the core backend.

20. Architecture Review

The backend follows a Modular Monolith architecture.

This is a deliberate choice.

Why not microservices?

Easier to develop.
Easier to debug.
Simpler deployment.
Lower operational overhead.
Well-suited to the current scale of the project.

If the platform grows significantly, individual modules (such as Orders or Notifications) can later be extracted into separate services because the boundaries have already been defined.