08 - Checkout Architecture
1. Purpose

The Checkout domain is responsible for converting a customer's cart into a confirmed order.

Checkout validates customer information, shipping address, inventory, pricing, payment details, and creates an immutable order.

Checkout is a temporary workflow.

It does not permanently store data.

2. Current Architecture
Checkout Page

↓

Redux Checkout Slice

↓

LocalStorage

↓

Place Order

↓

Orders Slice

The checkout process is currently managed completely on the frontend.

3. Future Architecture
Checkout Page

↓

useCreateCheckoutMutation()

↓

POST /checkout

↓

Node.js API

↓

Payment Gateway

↓

Create Order

↓

PostgreSQL

The UI remains unchanged.

Only the implementation changes.

4. Responsibilities

Checkout is responsible for:

Validating cart
Validating shipping address
Validating inventory
Validating prices
Processing payment
Creating order
Clearing cart

Checkout does not own:

Products
Customer Profile
Orders
Inventory

It coordinates these domains.

5. Current Redux State

Current state:

CheckoutState {

    shippingAddress

    paymentMethod

}

Checkout stores only temporary user selections.

6. Future State Management

Checkout becomes almost entirely backend-driven.

Future flow:

Checkout Page

↓

Create Checkout Mutation

↓

Backend

↓

Order Created

↓

Navigate to Success Page

The checkout slice may eventually become optional, retaining only temporary UI state if needed.

7. RTK Query Responsibilities

Future API

POST /checkout

GET /checkout/session

POST /checkout/payment

Responsibilities:

Submit checkout
Validate checkout
Process payment
Return order confirmation
8. Backend Responsibilities

Checkout Service

Validate User

↓

Validate Address

↓

Validate Cart

↓

Validate Inventory

↓

Calculate Totals

↓

Process Payment

↓

Create Order

↓

Reduce Inventory

↓

Clear Cart

↓

Return Order

All business rules execute on the backend.

9. Database Interaction

Checkout itself has no table.

It orchestrates updates to:

orders

order_items

payments

cart

inventory
10. Business Rules

Backend validates:

Customer authenticated
Cart not empty
Products still available
Inventory sufficient
Prices unchanged
Shipping address exists
Payment succeeds

If any validation fails:

Order is not created.

11. API Contract
POST /checkout

Request

{
  "shippingAddressId": "addr_001",
  "paymentMethod": "card"
}

Response

{
  "success": true,
  "data": {
    "orderId": "ord_001",
    "status": "paid"
  }
}
GET /checkout/session

Response

{
  "success": true,
  "data": {
    "cart": {},
    "shippingAddress": {},
    "totals": {}
  }
}
POST /checkout/payment

Request

{
  "paymentIntentId": "pi_123"
}

Response

{
  "success": true
}
12. Validation Rules

Customer

Authenticated

Cart

Cannot be empty

Shipping Address

Must exist

Inventory

Must be available

Payment

Must succeed
13. Security

Every checkout request is authenticated.

The backend ignores any prices sent by the frontend.

All totals are recalculated on the server.

The frontend cannot modify:

Product price
Shipping fee
Discount
Tax
14. Payment Integration

Supported payment methods:

Credit / Debit Card

Cash on Delivery

Stripe

PayPal

Apple Pay

Google Pay

The architecture is payment-provider agnostic.

A payment adapter layer can support multiple gateways.

15. Inventory Integration

Immediately before creating the order:

Check Inventory

↓

Reserve Stock

↓

Payment

↓

Finalize Order

If inventory changes during checkout:

Stop Checkout

↓

Return Validation Error
16. Order Integration

Checkout creates an immutable order snapshot.

The snapshot contains:

Products

Prices

Discounts

Shipping Address

Payment Method

Totals

Later product changes do not affect historical orders.

17. Cart Integration

Successful checkout:

Create Order

↓

Clear Cart

↓

Redirect Success Page

Failed checkout:

Cart Remains

↓

Customer Can Retry
18. Migration Plan

Current

Checkout

↓

Redux

↓

LocalStorage

↓

Orders Slice

Transition

Checkout

↓

RTK Query

↓

Backend

↓

Order API

Final

Checkout

↓

Node.js

↓

Payment Gateway

↓

PostgreSQL

The checkout slice eventually stores only temporary UI state (if any).

19. Future Improvements

The architecture supports:

Coupon Codes
Gift Cards
Loyalty Points
Split Payments
Installments (EMI)
Saved Payment Methods
One-Click Checkout
Guest Checkout
Tax Calculation Services
Shipping Provider Integration
Fraud Detection

All of these extend the checkout workflow without changing its core design.

Architecture Review

This document establishes one of the most important principles in the project:

The frontend initiates checkout, but the backend owns the transaction.

The backend is responsible for:

Validating every input.
Recalculating totals.
Reserving inventory.
Processing payment.
Creating the order.
Clearing the cart.

The frontend's responsibility is limited to collecting user input and displaying the results. This separation is essential for security, consistency, and supporting future clients (such as a mobile app or Admin Panel).