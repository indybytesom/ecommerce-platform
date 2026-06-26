06 - Reviews Architecture
1. Purpose

The Reviews domain allows authenticated customers to submit feedback and ratings for products they have purchased.

Reviews improve product credibility and help other customers make purchasing decisions.

Reviews belong to both a customer and a product.

2. Current Architecture
Product Details Page

↓

dispatch(addReview())

↓

reviewsSlice

↓

LocalStorage

Reviews are currently stored locally using Redux and LocalStorage.

3. Future Architecture
Product Details Page

↓

useCreateReviewMutation()

↓

POST /reviews

↓

Node.js API

↓

PostgreSQL

The UI remains unchanged.

Only the persistence layer changes.

4. Responsibilities

The Reviews domain is responsible for:

Product ratings
Customer comments
Listing reviews
Updating reviews
Deleting reviews

The Reviews domain is not responsible for:

Product information
Customer profile
Orders
Inventory
5. Current Redux State

Current state:

ReviewsState {
    reviews: Review[]
}

Each review:

Review {
    id
    productId
    userId
    userName
    rating
    comment
    createdAt
}
6. Future State Management

Reviews become server state.

Future flow:

Product Page

↓

useGetProductReviewsQuery()

↓

RTK Query Cache

↓

Backend

↓

Database

Eventually the Redux slice becomes unnecessary.

7. RTK Query Responsibilities

Current API

GET /products/:productId/reviews

GET /reviews/me

POST /reviews

PUT /reviews/:id

DELETE /reviews/:id

Responsibilities:

Fetch reviews
Submit review
Update review
Delete review
Cache reviews
8. Backend Responsibilities

Review Service

Validate User

↓

Validate Product

↓

Check Purchase Eligibility

↓

Prevent Duplicate Review

↓

Save Review

↓

Update Product Rating

Business Rules:

Product must exist.
Customer must be authenticated.
One review per product per customer.
(Optional) Customer must have purchased the product.
9. Database Design

Table

reviews

Columns

id

user_id

product_id

rating

comment

created_at

updated_at

Relationships

users

1

↓

N

reviews

N

↓

1

products
10. Business Rules

The backend enforces:

Rating between 1 and 5.
One review per user per product.
Users may edit only their own reviews.
Users may delete only their own reviews.
11. API Contract
GET /products/:productId/reviews

Response

{
  "success": true,
  "data": [
    {
      "id": "rev_001",
      "userName": "John Doe",
      "rating": 5,
      "comment": "Excellent quality.",
      "createdAt": "2026-06-26T10:00:00Z"
    }
  ]
}
GET /reviews/me

Response

{
  "success": true,
  "data": [
    {
      "id": "rev_001",
      "productId": 1,
      "rating": 5,
      "comment": "Excellent quality."
    }
  ]
}
POST /reviews

Request

{
  "productId": 1,
  "rating": 5,
  "comment": "Excellent quality."
}

Response

{
  "success": true
}
PUT /reviews/:id

Request

{
  "rating": 4,
  "comment": "Updated review."
}

Response

{
  "success": true
}
DELETE /reviews/:id

Response

{
  "success": true
}
12. Validation Rules

Rating

Required

1–5

Comment

Required

10–1000 characters

Product

Must exist

User

Must be authenticated
13. Security

Authentication required.

Users can:

Create their own reviews.
Edit their own reviews.
Delete their own reviews.

Administrators can:

Moderate reviews.
Remove inappropriate content.
14. Product Integration

Reviews affect product ratings.

Review

↓

Average Rating

↓

Product Page

The product should not permanently store every review. Instead, it may store aggregated values such as:

Average Rating
Review Count

These can be recalculated whenever reviews change.

15. Order Integration

To improve review quality, the backend may later enforce:

Completed Order

↓

Eligible to Review

↓

Review Submission

This prevents reviews from users who never purchased the product.

This feature can be enabled later without changing the API.

16. Migration Plan

Current

Reviews

↓

Redux

↓

LocalStorage

Transition

Reviews

↓

RTK Query

↓

Backend

↓

RTK Cache

Final

Reviews

↓

RTK Query

↓

Node.js

↓

PostgreSQL

The Redux slice eventually becomes unnecessary.

17. Future Improvements

The architecture supports:

Review images
Review videos
Verified Purchase badges
Helpful / Not Helpful voting
Admin moderation queue
AI review summarization
Review reporting

These features can be introduced without redesigning the core review model.

Architecture Review

This is the first module where authorization rules become as important as authentication.

Authentication answers:

"Who is the user?"

Authorization answers:

"Can this user modify this review?"

This distinction will become even more important in the Orders and Admin Panel modules.