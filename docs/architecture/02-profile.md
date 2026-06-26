02 - Profile Architecture
1. Purpose

The Profile domain is responsible for storing and managing customer information.

Unlike Authentication, Profile owns all personal information displayed throughout the application.

Profile does not authenticate users.

Authentication and Profile are two separate domains.

2. Current Architecture
Profile Page
      │
      ▼
dispatch(updateProfile())
      │
      ▼
profileSlice
      │
      ▼
LocalStorage

The profile data is currently stored entirely in Redux and persisted in LocalStorage.

3. Future Architecture
Profile Page
      │
      ▼
useUpdateProfileMutation()
      │
      ▼
PUT /profile
      │
      ▼
Node.js API
      │
      ▼
PostgreSQL

The UI remains unchanged.

Only the data source changes.

4. Responsibilities

The Profile domain owns:

First Name
Last Name
Phone Number
Avatar
Display Name

The Profile domain does not own:

Email
Password
JWT
Orders
Wishlist
Reviews

Those belong to other domains.

5. Current Redux State

Current state:

ProfileState {
    firstName
    lastName
    phone
    avatar
}
6. Future Redux State

Eventually Profile becomes server state.

RTK Query becomes the source of truth.

Redux Slice becomes optional.

Future flow:

Profile Page

↓

useGetProfileQuery()

↓

RTK Query Cache

↓

Backend

↓

Database

Eventually the profileSlice can be removed.

7. RTK Query Responsibilities

Current API:

GET /profile

PUT /profile

POST /profile/avatar

Responsibilities:

Load profile
Update profile
Upload avatar
Cache profile

Nothing else.

8. Backend Responsibilities

Profile Service:

Load Profile

↓

Validate Data

↓

Update Profile

↓

Return Updated Profile

Business logic:

Avatar validation
Phone validation
Name validation

No authentication logic.

9. Database Design

Table:

profiles

Columns:

id

user_id

first_name

last_name

phone

avatar

created_at

updated_at

Relationship:

users

1

↓

1

profiles

Every user owns exactly one profile.

10. API Contract
GET /profile

Response

{
  "success": true,
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "phone": "9876543210",
    "avatar": "https://..."
  }
}
PUT /profile

Request

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "9876543210"
}

Response

{
  "success": true,
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "phone": "9876543210",
    "avatar": "https://..."
  }
}
POST /profile/avatar

Request

multipart/form-data

Field

avatar

Response

{
  "success": true,
  "avatar": "https://..."
}
11. Validation Rules

First Name

Required

2–50 characters

Last Name

Required

2–50 characters

Phone

Optional

10–20 digits

Avatar

jpg

jpeg

png

webp

Maximum 2 MB
12. Security

Protected Route

Authentication required.

Users can only update their own profile.

Admin panel has separate profile management.

13. Migration Plan

Current

Profile Page

↓

Redux

↓

LocalStorage

Transition

Profile Page

↓

RTK Query

↓

Backend

↓

RTK Cache

Final

Profile Page

↓

RTK Query

↓

Node.js

↓

PostgreSQL

Profile Slice eventually becomes unnecessary.

14. Future Improvements

Planned:

Cover Image
Bio
Date of Birth
Gender
Preferred Language
Preferred Currency
Time Zone

The current architecture already supports these additions without structural changes.