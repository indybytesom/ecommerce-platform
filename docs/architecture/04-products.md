04 - Products Architecture
1. Purpose

The Product domain is the core of the ecommerce platform.

Every commerce feature depends on products.

Products are read by customers, managed by administrators, referenced by carts, wishlists, reviews, and orders.

Products are never modified by customers.

2. Current Architecture
Products Page

↓

Redux / Static Data

↓

products.ts

↓

UI Components

Currently products are loaded from local static data.

3. Future Architecture
Products Page

↓

useGetProductsQuery()

↓

GET /products

↓

Node.js API

↓

PostgreSQL

The UI remains unchanged.

Only the data source changes.

4. Responsibilities

The Product domain owns:

Product Information
SKU
Price
Images
Stock
Variants
Category
Availability

The Product domain does not own:

Reviews
Wishlist
Cart
Orders

Those reference products but don't own them.

5. Current Product Model

Current frontend model:

Product {
    id
    slug
    title
    category
    description
    price
    oldPrice
    badge
    images
    sizes
    inStock
    stockCount
    sku
}
6. Future Product Model

Backend expands this model.

Product

id

slug

title

description

sku

price

comparePrice

categoryId

brandId

inventory

status

createdAt

updatedAt

The frontend does not need all fields immediately.

7. RTK Query Responsibilities

Current API

GET /products

Future APIs

GET /products

GET /products/:slug

GET /products/:id

GET /products/category/:slug

GET /products/search

GET /products/featured

RTK Query handles:

Product caching
Pagination
Search
Filtering
8. Backend Responsibilities

Product Service

Load Products

↓

Apply Filters

↓

Apply Sorting

↓

Return Paginated Result

Business logic:

Search
Sorting
Inventory
Visibility
9. Database Design

Tables

products

categories

brands

product_images

product_variants

Relationships

Category

1

↓

N

Products
Product

1

↓

N

Images
Product

1

↓

N

Variants
10. API Contract
GET /products

Response

{
  "success": true,
  "data": [
    {
      "id": 1,
      "slug": "nike-air-max",
      "title": "Nike Air Max",
      "price": 149,
      "stockCount": 18
    }
  ]
}
GET /products/:slug

Response

{
  "success": true,
  "data": {
    "id": 1,
    "slug": "nike-air-max",
    "title": "Nike Air Max",
    "description": "...",
    "price": 149
    }
}
11. Validation Rules

Product Title

Required

Maximum 150 characters

Price

Greater than zero

SKU

Unique

Slug

Unique

Stock

Cannot be negative
12. Security

Customers

Read-only.

Administrators

Create

Update

Delete

Products.

13. Search

Backend supports:

Keyword

Category

Price Range

Size

Availability

Sorting

Frontend only sends query parameters.

14. Inventory

Inventory is managed only by backend.

Frontend never modifies stock.

Orders reduce stock.

Cancelled orders restore stock.

15. Migration Plan

Current

products.ts

↓

Redux

↓

UI

Transition

RTK Query

↓

Backend

↓

RTK Cache

Final

Products

↓

RTK Query

↓

Node.js

↓

PostgreSQL

Static product data is removed.

16. Admin Panel Integration

Admin manages:

Products
Categories
Images
Inventory
Prices
Featured Products

Customers only consume product data.

17. Future Improvements

The current architecture is intentionally simple but leaves room for:

Product Variants (Color, Size, Material)
Product Collections
Product Tags
Related Products
Cross-Sell / Upsell
Inventory Reservations
Product SEO
Multi-currency Pricing
Digital Products

These can all be added without changing the core product architecture.

Architecture Review

This is the first document where we're deliberately separating product data from commerce data.

A product should remain an independent entity.

For example:

Wishlist stores references to products.
Cart stores references to products plus quantity.
Reviews store references to products plus review content.
Orders store a snapshot of product details at the time of purchase.

This distinction will make the upcoming Wishlist, Cart, Reviews, and Orders documents much cleaner and will translate directly into your PostgreSQL schema and Prisma models later.