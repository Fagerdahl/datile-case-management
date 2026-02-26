# datile-case-management
This is a Repository for a case management system for Datile IT AB
___

# API Documentation
## Errands
### GET ``/api/errands``
Returns a list of errands
###### Response - (200 OK)
```json
{
  "errands": [
        {
          "errand_id": "1",
          "date_created": "2026-02-24",
          "title": "Test errand",
          "assignee": "Tom",
          "customer": "John Doe AB",
          "contact": "John",
          "phone_number": "0701234567",
          "mail": "johndoe@gmail.com",
          "history": [
            {
              "description": "I did a thing",
              "verified_name": "Tom",
              "created_at": "2026-02-25T12:00:00"
            }
          ]
        }
      ]
}
```
___
### GET ``/api/errands/{id}``
Returns a single errand.
###### Response - (200 OK)
```json
{
  "errand_id": "1",
  "date_created": "2026-02-25",
  "title": "Test errand",
  "assignee": "Tom",
  "customer": "John Doe AB",
  "contact": "John",
  "phone_number": "0701234567",
  "mail": "johndoe@gmail.com",
  "history": [
    {
      "description": "I did a thing",
      "verified_name": "Tom",
      "created_at": "2026-02-25T12:00:00"
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
    }
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
  "assignee": "Tom",
  "customer": "John Doe AB",
  "contact": "John",
  "phone_number": "0701234567",
  "mail": "johndoe@gmail.com",
  "history": [
    {
      "description": "I created the errand",
      "verified_name": "Tom",
      "created_at": "2026-02-25T12:00:00"
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
    }
  ],
  "agreed_price": 150
}
```
###
###### Response – (201 Created)
```json
{
  "errand_id": "1",
  "date_created": "2026-02-25",
  "title": "Test errand",
  "assignee": "Tom",
  "customer": "John Doe AB",
  "contact": "John",
  "phone_number": "0701234567",
  "mail": "johndoe@gmail.com",
  "history": [
    {
      "description": "I created the errand",
      "verified_name": "Tom",
      "created_at": "2026-02-25T12:00:00"
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
    }
  ],
  "agreed_price": 150
}
```
###
###### Response - (400 Bad Request)
```json
{
  "status": "Bad request",
  "message": "Required fields missing or invalid"
}
```
___
### PUT ``/api/errands/{id}``
Updates an errand
###### Request body
```json
{
  "date_created": "2026-02-25",
  "title": "Test errand",
  "assignee": "Tom",
  "customer": "John Doe AB",
  "contact": "John",
  "phone_number": "0701234567",
  "mail": "johndoe@gmail.com",
  "history": [
    {
      "description": "I created the errand",
      "verified_name": "Tom",
      "created_at": "2026-02-25T12:00:00"
    },
    {
      "description": "I did a thing",
      "verified_name": "Tom",
      "created_at": "2026-02-27T13:26:00"
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
    }
  ],
  "agreed_price": 150
}
```
###
###### Response - (200 OK)
```json
{
  "status": "200 OK",
  "message": "Errand with id {id} updated successfully"
}
```
___
## Customers
### GET ``/api/customers``
Returns a list of customers and their respective contacts
###### Response - (200 OK)
```json
{
  "customers": [
    {
      "customer": "Hultelid",
      "fortnox_id": "00000",
      "contacts": [
        {
          "first_name": "John",
          "last_name": "Doe",
          "phone_number": "0701234567",
          "mail": "johndoe@gmail.com"
        }
      ]
    }
  ]
}
```
___
### POST ``/api/customers``
Creates a new customer
###### Request body
```json
{
  "customer": "John Doe AB",
  "fortnox_id": "00001"
}
```
###
###### Response - (201 Created)
```json
{
  "customer": "John Doe AB",
  "fortnox_id": "00001"
}
```
###
###### Response - (400 Bad Request)
```json
{
  "status": "Bad request",
  "message": "Required fields missing or invalid"
}
```
___
### POST ``/api/customers/{id}/contacts``
Creates a new contact for a customer
###### Request body
```json
{
  "first_name": "Jane",
  "last_name": "Doe",
  "phone_number": "0701234567",
  "mail": "janedoe@gmail.com"
}
```
###
###### Response - (201 Created)
```json
{
  "first_name": "Jane",
  "last_name": "Doe",
  "phone_number": "0701234567",
  "mail": "janedoe@gmail.com"
}
```
###### Response - (400 Bad Request)
```json
{
  "status": "Bad request",
  "message": "Required fields missing or invalid"
}
```
___ 
### PUT ``/api/customers/{id}``
Updates a customer
###### Request body
```json
{
  "customer": "John Doen't AB"
}
```
###
###### Response - (200 OK)
```json
{
  "status": "200 OK",
  "message": "Customer with id {id} updated successfully"
}
```
###
###### Response - (400 Bad Request)
```json
{
  "status": "Bad request",
  "message": "Required fields missing or invalid"
}
```
___
### PUT ``/api/customers/{id}/contacts/{contact_id}``
Updates a contact for a customer
###### Request body
```json
{
  "first_name": "Jane",
  "last_name": "Doen't",
  "phone_number": "0701234567",
  "mail": "janedoent@gmail.com"
}
```
###
###### Response - (200 OK)
```json
{
  "status": "200 OK",
  "message": "Contact belonging to customer with id {id} updated successfully"
}
```
###
###### Response - (400 Bad Request)
```json
{
  "status": "Bad request",
  "message": "Required fields missing or invalid"
}
```
