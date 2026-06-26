07 - Cart Architecture
1. Purpose

The Cart domain allows customers to temporarily collect products before completing the checkout process.

The cart acts as a workspace where customers can review, modify, and prepare purchases.

The cart is not an order.

The cart exists only until checkout is completed or the customer clears it.

2. Current Architecture
Product Page

↓

dispatch(addToCart())

↓

cartSlice

↓

LocalStorage

↓

Cart Drawer / Cart Page

The cart is currently managed entirely on the frontend.

3. Future Architecture
Product Page

↓

useAddToCartMutation()

↓

POST /cart

↓

Node.js API

↓

PostgreSQL / Redis

The UI remains unchanged.

Only the data source changes.

4. Responsibilities

The Cart domain owns:

Cart Items
Quantity
Selected Size / Variant
Cart Total
Cart Subtotal
Cart Count

The Cart domain does not own:

Products
Orders
Payments
Shipping
Customer Profile
5. Current Redux State

Current state:

CartState {

    items

    subtotal

    total

    itemCount

    isOpen
}

Each item references:

Product

+

Quantity

+

Selected Size
6. Future State Management

Future flow:

Cart Drawer

↓

useGetCartQuery()

↓

RTK Query Cache

↓

Backend

↓

Database

The backend becomes the source of truth.

Redux remains only for UI state.

7. RTK Query Responsibilities

Future API

GET /cart

POST /cart

PUT /cart/items/:id

DELETE /cart/items/:id

DELETE /cart

Responsibilities:

Load cart
Add product
Update quantity
Remove product
Clear cart
8. Backend Responsibilities

Cart Service

Validate Product

↓

Validate Inventory

↓

Update Quantity

↓

Recalculate Totals

↓

Return Updated Cart

Business rules:

Quantity cannot exceed inventory.
Quantity cannot be less than one.
Duplicate products merge quantities.
Prices always come from the Product service.
9. Database Design

Initially we can use PostgreSQL.

Later Redis may be introduced for faster cart access.

Tables

carts

cart_items

Relationships

users

1

↓

1

cart

1

↓

N

cart_items

N

↓

1

products
10. Business Rules

The backend enforces:

Quantity ≥ 1
Quantity ≤ Available Inventory
Product must exist
Variant must exist (if applicable)

Totals are always calculated by the backend.

11. API Contract
GET /cart

Response

{
  "success": true,
  "data": {
    "items": [],
    "subtotal": 299,
    "total": 299,
    "itemCount": 3
  }
}
POST /cart

Request

{
  "productId": 1,
  "quantity": 1,
  "size": "M"
}

Response

{
  "success": true
}
PUT /cart/items/:id

Request

{
  "quantity": 3
}

Response

{
  "success": true
}
DELETE /cart/items/:id

Response

{
  "success": true
}
DELETE /cart

Response

{
  "success": true
}
12. Validation Rules

Quantity

Required

Minimum 1

Maximum Available Stock

Product

Must exist

Variant

Must exist
13. Security

Authenticated users have persistent carts.

Guest users may use temporary carts stored locally or in a session.

After login, guest carts may be merged into the authenticated user's cart.

14. Product Integration

Cart stores references to products.

Prices are fetched from the Product service.

If a product price changes before checkout:

Product Updated

↓

Cart Refresh

↓

Latest Price Displayed

The backend is always the pricing authority.

15. Checkout Integration

Cart feeds directly into Checkout.

Cart

↓

Checkout

↓

Payment

↓

Order

Checkout never owns cart items.

It consumes the current cart state.

16. Order Integration

When checkout succeeds:

Cart

↓

Create Order

↓

Order Snapshot

↓

Clear Cart

The order stores a snapshot of product details and pricing.

The cart is then emptied.

17. Migration Plan

Current

Cart

↓

Redux

↓

LocalStorage

Transition

Cart

↓

RTK Query

↓

Backend

↓

RTK Cache

Final

Cart

↓

RTK Query

↓

Node.js

↓

Database

Redux remains only for UI concerns such as opening or closing the cart drawer.

18. Future Improvements

The architecture supports:

Coupon Codes
Gift Cards
Saved Carts
Cart Sharing
Buy Now
Multi-Currency Pricing
Inventory Reservation
Real-Time Price Updates

These can all be added without changing the core cart architecture.

Architecture Review

This document introduces an important principle that will guide the remainder of the system:

The backend is always the source of truth for pricing and totals.

Even if the frontend calculates provisional totals for responsiveness, the backend must recalculate:

Subtotal
Discounts
Taxes
Shipping
Total

before creating an order. This prevents price manipulation and ensures consistency across web, mobile, and future sales channels.