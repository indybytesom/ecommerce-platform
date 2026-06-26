03 - Addresses Architecture
1. Purpose

The Address domain is responsible for storing customer shipping and billing addresses.

Each authenticated customer can manage multiple addresses.

One address may be marked as the default address.

The Address domain is independent from Orders and Checkout, although both consume address data.

2. Current Architecture
Address Book Page
        │
        ▼
dispatch(addAddress())

dispatch(updateAddress())

dispatch(deleteAddress())

dispatch(setDefaultAddress())
        │
        ▼
addressesSlice
        │
        ▼
LocalStorage

All addresses are currently stored in Redux and persisted in LocalStorage.

3. Future Architecture
Address Book Page
        │
        ▼
RTK Query Mutation
        │
        ▼
Node.js API
        │
        ▼
PostgreSQL

The UI remains unchanged.

Only the data source changes.

4. Responsibilities

The Address domain owns:

First Name
Last Name
Phone
Address Line 1
Address Line 2
City
State
Postal Code
Country
Default Address

The Address domain does not own:

Orders
Shipping Rates
Payment
Customer Authentication
5. Current Redux State

Current state:

AddressesState {
    addresses: Address[]
}

Each Address contains:

id

firstName

lastName

phone

addressLine1

addressLine2

city

state

postalCode

country

isDefault
6. Future State Management

Addresses become server state.

Future flow:

Address Book

↓

useGetAddressesQuery()

↓

RTK Query Cache

↓

Backend

↓

Database

Eventually the Redux slice becomes unnecessary.

7. RTK Query Responsibilities

Current API:

GET /addresses

POST /addresses

PUT /addresses/:id

DELETE /addresses/:id

PATCH /addresses/:id/default

Responsibilities:

Fetch addresses
Create address
Update address
Delete address
Change default address
Cache addresses
8. Backend Responsibilities

Address Service

Validate Address

↓

Create / Update

↓

Ensure Single Default Address

↓

Return Updated List

Business rules:

Validate phone
Validate country
Validate postal code
Maintain exactly one default address
Prevent duplicate IDs
9. Database Design

Table

addresses

Columns

id

user_id

first_name

last_name

phone

address_line_1

address_line_2

city

state

postal_code

country

is_default

created_at

updated_at

Relationship

users

1

↓

N

addresses

A user can own multiple addresses.

Each address belongs to exactly one user.

10. Business Rules

The backend enforces:

✅ One default address per user

If a new default address is selected:

Current Default

↓

is_default = false

↓

New Address

↓

is_default = true

The frontend should never need to manage this logic.

11. API Contract
GET /addresses

Response

{
  "success": true,
  "data": [
    {
      "id": "addr_001",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "9876543210",
      "addressLine1": "221B Baker Street",
      "addressLine2": "",
      "city": "London",
      "state": "London",
      "postalCode": "NW16XE",
      "country": "United Kingdom",
      "isDefault": true
    }
  ]
}
POST /addresses

Request

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "9876543210",
  "addressLine1": "221B Baker Street",
  "addressLine2": "",
  "city": "London",
  "state": "London",
  "postalCode": "NW16XE",
  "country": "United Kingdom",
  "isDefault": true
}

Response

{
  "success": true
}
PUT /addresses/:id

Request

Same body as POST.

Response

{
  "success": true
}
DELETE /addresses/:id

Response

{
  "success": true
}
PATCH /addresses/:id/default

Response

{
  "success": true
}
12. Validation Rules

First Name

Required

2–50 characters

Last Name

Required

2–50 characters

Phone

Required

10–20 digits

Address Line 1

Required

Maximum 200 characters

Address Line 2

Optional

City

Required

State

Required

Postal Code

Required

Country

Required
13. Security

Authentication required.

A user can only:

Read their own addresses
Update their own addresses
Delete their own addresses

The backend validates ownership using the authenticated user's ID.

14. Checkout Integration

Checkout consumes addresses.

Flow:

Address Book

↓

Default Address

↓

Checkout

↓

Order

↓

Shipping

Checkout never owns addresses.

It only references them.

15. Order Integration

When an order is placed:

Address

↓

Copied Into Order

The order stores a snapshot of the address.

Reason:

If the customer edits an address later, historical orders must remain unchanged.

This is a very important backend design rule.

16. Migration Plan

Current

Address Book

↓

Redux

↓

LocalStorage

Transition

Address Book

↓

RTK Query

↓

Backend

↓

RTK Cache

Final

Address Book

↓

RTK Query

↓

Node.js

↓

PostgreSQL

The Redux slice eventually becomes unnecessary.

17. Future Improvements

Possible future enhancements:

Billing Address
Shipping Address
Address Labels (Home, Office, Other)
Latitude / Longitude
Google Places Autocomplete
Address Verification API
International Address Formatting

The current architecture supports these additions without major structural changes.

Architecture Review

This is the first document where we define an important backend principle that will apply throughout the project:

Orders should never reference the current address directly. They should store a copy (snapshot) of the shipping address at the time the order is placed.

This ensures that if a customer edits or deletes an address later, existing orders remain historically accurate. We'll build on this principle in the upcoming Orders Architecture document.