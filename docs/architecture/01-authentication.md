Authentication Architecture

Let's begin.

1. Purpose

Authentication is responsible for verifying the customer's identity and maintaining their authenticated session.

Authentication does not own customer profile information.

Customer information belongs to the Profile domain.

2. Current Architecture
Login Page
      │
      ▼
dispatch(login())
      │
      ▼
authSlice
      │
      ▼
LocalStorage

The frontend currently uses mock authentication.

No backend communication exists yet.

3. Future Architecture
Login Page
      │
      ▼
useLoginMutation()
      │
      ▼
POST /auth/login
      │
      ▼
Node.js API
      │
      ▼
PostgreSQL
      │
      ▼
JWT

The UI remains unchanged.

Only the implementation changes.

4. Authentication Responsibilities

Authentication is responsible for:

Login
Logout
Register
Session
Access Token
Refresh Token
Authentication status

Authentication is NOT responsible for:

First name
Last name
Avatar
Phone number
Addresses
Orders
Wishlist

Those belong to other domains.

5. Current Redux State

Current state:

AuthState {
    user
    accessToken
    isAuthenticated
    isLoading
    isHydrated
}
6. Future Redux State

The Auth slice will continue to exist.

Purpose:

Authentication Session

Only.

Example:

AuthState {

    user

    accessToken

    refreshToken

    isAuthenticated

    isHydrated
}

Notice:

No business logic.

Only session state.

7. RTK Query Responsibilities

Auth API is responsible for:

POST /login

POST /register

POST /logout

POST /refresh

GET /me

Nothing else.

8. Backend Responsibilities

Authentication Service

Validate credentials

↓

Generate JWT

↓

Generate Refresh Token

↓

Return session

No profile updates.

No orders.

No wishlist.

9. Database

Tables

users

refresh_tokens

Initially:

users

Later:

refresh_tokens

for persistent login.

10. API Contract
POST /auth/login

Request

{
    "email": "john@example.com",
    "password": "password123"
}

Response

{
    "success": true,
    "data": {
        "user": {
            "id": "usr_123",
            "email": "john@example.com"
        },
        "accessToken": "...",
        "refreshToken": "..."
    }
}
POST /auth/register

Request

{
    "email": "john@example.com",
    "password": "password123"
}

Response

{
    "success": true
}
GET /auth/me

Response

{
    "success": true,
    "data": {
        "id": "usr_123",
        "email": "john@example.com"
    }
}
POST /auth/logout

Response

{
    "success": true
}
11. JWT Strategy

Access Token

Short lifetime

15–30 minutes

Refresh Token

Long lifetime

7–30 days

When access token expires:

Frontend

↓

POST /refresh

↓

Receive new access token

↓

Continue session

No forced login.

12. Security

Authentication middleware protects:

/profile

/orders

/wishlist

/reviews

/addresses

/checkout

Public routes:

/products

/categories

/home
13. Migration Plan

Current

Login

↓

Redux

↓

LocalStorage

Transition

Login

↓

RTK Query

↓

Backend

↓

Redux Session

Final

Login

↓

RTK Query

↓

Backend

↓

JWT

↓

Redux Session

Notice:

Redux is not removed.

Its responsibility changes.

14. Future Improvements

Planned:

Google Login
GitHub Login
OTP Login
Email Verification
Forgot Password
Reset Password
Change Password
MFA (Optional)

None of these require changing the UI architecture.

Architecture Review

I also noticed one improvement we should schedule before backend implementation.

Your current login reducer only accepts a User:

login: (state, action: PayloadAction<User>) => {
  state.user = action.payload;
  state.isAuthenticated = true;
}

With JWT authentication, you'll eventually want something like:

type LoginPayload = {
  user: User;
  accessToken: string;
};

Then:

login: (state, action: PayloadAction<LoginPayload>) => {
  state.user = action.payload.user;
  state.accessToken = action.payload.accessToken;
  state.isAuthenticated = true;
}

We're not changing this now, because the mock authentication is still driving the app. Instead, we'll note it as part of the migration plan and implement it when we wire the real backend.