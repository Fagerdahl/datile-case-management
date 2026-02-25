# datile-case-management
This is a Repository for a case management system for Datile IT AB
___

# API Documentation
## Errands
### __GET__ ``/api/errands``
Returns a list of errands
```json
{
  "errands": [
        {
          "errand_id": "1",
          "date_created": "2026-02-24",
          "title": "Test errand",
          "assignee": "Jimmy",
          "customer": "John Doe AB",
          "contact": "John",
          "phone_number": "0701234567",
          "mail": "johndoe@gmail.com",
          "history": [
            {
              "description": "I did a thing",
              "verified_name": "Jimmy",
              "created_at": "2026-02-25:12:00"
            }
          ]
        },
        { ... }
      ]
}
```
___

### GET ``/api/errands/{id}``
Returns a single errand.
#### Response - (200 OK)
```json
{
  "errand_id": "1",
  "date_created": "2026-02-25",
  "title": "Test errand",
  "assignee": "Jimmy",
  "customer": "John Doe AB",
  "contact": "John",
  "phone_number": "0701234567",
  "mail": "johndoe@gmail.com",
  "history": [
    {
      "description": "I did a thing",
      "verified_name": "Jimmy",
      "created_at": "2026-02-25:12:00"
    }
  ],
  "description": "Johns errand description",
  "timescale": 1,
  "status": "New",
  "priority": "HIGH",
  "purchases": [
    {
      "purchase_id": "1",
      "purchase": "computer",
      "purchase_date": "2026-02-25",
      "price": 250,
      "shipping": 50,
      "outprice": 400,
      "comment": "..."
    },
    { ... }
  ],
  "agreed_price": 150
}
```
___

### POST ``/api/errands``
Creates a new errand
###### Request body
```json
{
  "title": "Test errand",
  "assignee": "Jimmy",
  "customer": "John Doe AB",
  "contact": "John",
  "phone_number": "0701234567",
  "mail": "johndoe@gmail.com",
  "history": [
    {
      "description": "I created the errand",
      "verified_name": "Jimmy",
      "created_at": "2026-02-25:12:00"
    }
  ],
  "description": "Johns errand description",
  "timescale": 1,
  "status": "New",
  "priority": "HIGH",
  "purchases": [
    {
      "purchase": "computer",
      "purchase_date": "2026-02-25",
      "price": 250,
      "shipping": 50,
      "outprice": 400,
      "comment": "..."
    },
    { ... }
  ],
  "agreed_price": 150
}
```
###
###### Response (201 Created)
```json

{
  "errand_id": "1",
  "date_created": "2026-02-25",
  "title": "Test errand",
  "assignee": "Jimmy",
  "customer": "John Doe AB",
  "contact": "John",
  "phone_number": "0701234567",
  "mail": "johndoe@gmail.com",
  "history": [
    {
      "description": "I created the errand",
      "verified_name": "Jimmy",
      "created_at": "2026-02-25:12:00"
    }
  ],
  "description": "Johns errand description",
  "timescale": 1,
  "status": "New",
  "priority": "HIGH",
  "purchases": [
    {
      "purchase_id": "1",
      "purchase": "computer",
      "purchase_date": "2026-02-25",
      "price": 250,
      "shipping": 50,
      "outprice": 400,
      "comment": "..."
    },
    { ... }
  ],
  "agreed_price": 150
}
```
###
###### Response (400 Bad Request)
```json
{
  "status": "Bad request",
  "message": "Required fields missing or invalid"
}
```
___