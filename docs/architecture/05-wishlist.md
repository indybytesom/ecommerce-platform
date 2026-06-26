05 - Wishlist Architecture
1. Purpose

The Wishlist domain allows authenticated customers to save products for future purchase.

Wishlist is a user-specific feature.

It stores references to products rather than copies of product data.

Wishlist does not manage inventory, pricing, or product information.

2. Current Architecture
Product Card

↓

dispatch(addToWishlist())

↓

wishlistSlice

↓

LocalStorage

All wishlist items are currently stored in Redux and persisted in LocalStorage.

3. Future Architecture
Product Card

↓

useAddToWishlistMutation()

↓

POST /wishlist

↓

Node.js API

↓

PostgreSQL

The UI remains unchanged.

Only the persistence layer changes.

4. Responsibilities

The Wishlist domain is responsible for:

Saving products
Removing products
Listing saved products
Preventing duplicates

The Wishlist domain is not responsible for:

Product information
Pricing
Inventory
Reviews
Orders

Those belong to the Product domain.

5. Current Redux State

Current state:

WishlistState {
    items: WishlistItem[]
}

Each WishlistItem is currently:

type WishlistItem = Product;

This works well for the frontend.

6. Future State Management

Wishlist becomes server state.

Future flow:

Wishlist Page

↓

useGetWishlistQuery()

↓

RTK Query Cache

↓

Backend

↓

Database

Eventually the Redux slice becomes unnecessary.

7. RTK Query Responsibilities

Current API

GET /wishlist

POST /wishlist

DELETE /wishlist/:productId

DELETE /wishlist

Responsibilities:

Load wishlist
Add product
Remove product
Clear wishlist
Cache wishlist
8. Backend Responsibilities

Wishlist Service

Validate User

↓

Validate Product

↓

Prevent Duplicate

↓

Save Wishlist Item

↓

Return Updated Wishlist

Business rules:

Product must exist
User must be authenticated
Duplicate entries are not allowed
9. Database Design

Table

wishlist_items

Columns

id

user_id

product_id

created_at

Relationships

users

1

↓

N

wishlist_items

N

↓

1

products

Each wishlist item belongs to one user and references one product.

10. Business Rules

The backend enforces:

A user cannot add the same product twice.
Deleting a product removes only that user's wishlist entry.
Clearing the wishlist removes all entries for the authenticated user.
Wishlist data is private to the user.
11. API Contract
GET /wishlist

Response

{
  "success": true,
  "data": [
    {
      "productId": 1
    }
  ]
}

Implementation Note:
The backend may return either only product IDs or fully populated product objects. For this project, we will return populated product data so the frontend can render the wishlist without making additional product requests.

Example:

{
  "success": true,
  "data": [
    {
      "id": 1,
      "slug": "nike-air-max",
      "title": "Nike Air Max",
      "price": 149,
      "images": ["..."]
    }
  ]
}
POST /wishlist

Request

{
  "productId": 1
}

Response

{
  "success": true
}
DELETE /wishlist/:productId

Response

{
  "success": true
}
DELETE /wishlist

Response

{
  "success": true
}
12. Validation Rules

Product ID

Required

Must exist

User

Must be authenticated

Duplicate Entry

Not allowed
13. Security

Authentication required.

Users can only access their own wishlist.

Administrators do not manage customer wishlists through the Admin Panel.

14. Product Integration

Wishlist stores references to products.

It never stores independent product information.

If a product price changes:

Product

↓

Wishlist automatically shows new price

This avoids stale product data.

15. Cart Integration

Wishlist supports moving products into the cart.

Flow:

Wishlist

↓

Add to Cart

↓

Cart

↓

(Optional)

Remove from Wishlist

Whether the wishlist item is automatically removed after adding to the cart is a business decision that can be configured later.

16. Migration Plan

Current

Wishlist

↓

Redux

↓

LocalStorage

Transition

Wishlist

↓

RTK Query

↓

Backend

↓

RTK Cache

Final

Wishlist

↓

RTK Query

↓

Node.js

↓

PostgreSQL

The Redux slice eventually becomes unnecessary.

17. Future Improvements

The current architecture supports future enhancements such as:

Wishlist sharing
Multiple wishlists (e.g., "Birthday", "Favorites")
Public wishlists
Wishlist notifications for price drops
Wishlist stock alerts
AI-powered product recommendations based on wishlist contents

These features can be added without redesigning the core wishlist model.

Architecture Review

One design decision I'd like to formalize here is how the frontend receives wishlist data.

Your current frontend uses:

type WishlistItem = Product;

I recommend keeping this approach.

Internally, the database only stores:

user_id

product_id

However, the backend should return fully populated product objects rather than just product IDs. This keeps the frontend simple, reduces additional API calls, and aligns with the current UI architecture you've already built.

This pattern—storing references internally but returning enriched data through the API—is common in production ecommerce systems and will also be useful later for the Cart and Orders APIs.