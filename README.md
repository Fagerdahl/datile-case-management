# datile-case-management
This is a Repository for a case management system for Datile IT AB
___

# API Documentation
## Errands
### GET ``/api/errands``
Returns a filtered and sorted list of errands

###### Query parameters (optional)
- ``search`` – Text filter using contains (matches title and description)
- ``customer_id`` – Filter by customer
- ``assignee_id`` – Filter by assignee
- ``status_ids`` – Comma separated list of status ids
- ``priority_ids`` – Comma separated list of priority ids
- ``sort_by`` – Field to sort by (date_created, customer, title, category, status, priority, timescale, assignee)

###### Example request
```
/api/errands?search=server&status_ids=1,2&priority_ids=2,5&sort_by=date_created
```

###### Response - (200 OK)
```json
{
  "errands": [
    {
      "errand_id": "1",
      "date_created": "2026-02-24",
      "title": "Server installation",
      "category": "Infrastructure",
      "timescale": 1.0,
      "assignee": {
        "assignee_id": "5",
        "name": "Viktor"
      },
      "customer": {
        "customer_id": "3",
        "name": "AJ Tryckluft"
      },
      "status": {
        "status_id": "1",
        "name": "New"
      },
      "priority": {
        "priority_id": "2",
        "name": "High",
        "color": "#FF8800"
      }
    }
  ]
}
```
###
###### Response - (400 Bad Request)
```json
{
  "status": "Bad request",
  "message": "Invalid filter or sorting parameters"
}
```
___
### GET ``/api/errands/{id}``
Returns a single errand

###### Response - (200 OK)
```json
{
  "errand_id": "1",
  "date_created": "2026-02-25",
  "title": "Test errand",
  "assignee": {
    "assignee_id": "5",
    "name": "Tom"
  },
  "customer": {
    "customer_id": "3",
    "name": "John Doe AB"
  },
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
  "status": {
    "status_id": "1",
    "name": "New"
  },
  "priority": {
    "priority_id": "2",
    "name": "High",
    "color": "#FF8800"
  },
  "purchases": [
    {
      "purchase_id": "1",
      "purchase": "Computer",
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
###### Response - (404 Not Found)
```json
{
  "status": "Not found",
  "message": "Errand with id {id} not found"
}
```
___
### POST ``/api/errands``
Creates a new errand

###### Request body
```json
{
  "title": "Test errand",
  "assignee_id": "5",
  "customer_id": "3",
  "contact": "John",
  "phone_number": "0701234567",
  "mail": "johndoe@gmail.com",
  "description": "Johns errand description",
  "timescale": 1,
  "status_id": "1",
  "priority_id": "2",
  "purchases": [
    {
      "purchase": "Computer",
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
  "assignee": {
    "assignee_id": "5",
    "name": "Tom"
  },
  "customer": {
    "customer_id": "3",
    "name": "John Doe AB"
  },
  "contact": "John",
  "phone_number": "0701234567",
  "mail": "johndoe@gmail.com",
  "description": "Johns errand description",
  "timescale": 1,
  "status": {
    "status_id": "1",
    "name": "New"
  },
  "priority": {
    "priority_id": "2",
    "name": "High",
    "color": "#FF8800"
  },
  "purchases": [
    {
      "purchase_id": "1",
      "purchase": "Computer",
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
  "title": "Test errand",
  "assignee_id": "5",
  "customer_id": "3",
  "contact": "John",
  "phone_number": "0701234567",
  "mail": "johndoe@gmail.com",
  "description": "Johns errand description",
  "timescale": 1,
  "status_id": "1",
  "priority_id": "2",
  "purchases": [
    {
      "purchase_id": "1",
      "purchase": "Computer",
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

###
###### Response - (400 Bad Request)
```json
{
  "status": "Bad request",
  "message": "Required fields missing or invalid"
}
```
___
## Reports

### GET ``/api/reports``
Returns a filtered list of errands for export

###### Query parameters (optional)
- ``search`` – Filter by title or description
- ``date_from`` – Filter errands created from this date (YYYY-MM-DD)
- ``date_to`` – Filter errands created to this date (YYYY-MM-DD)
- ``customer_id`` – Filter by customer
- ``assignee_id`` – Filter by assignee
- ``status_ids`` – Comma separated list of status ids
- ``priority_ids`` – Comma separated list of priority ids

###### Example request
```
/api/reports?date_from=2026-02-01&date_to=2026-02-28&status_ids=1,2&priority_ids=3
```

###### Response - (200 OK)
```json
{
  "reports": [
    {
      "errand_id": "1",
      "customer": {
        "customer_id": "3",
        "name": "AJ Tryckluft"
      },
      "contact": "Jonas",
      "category": "Datavirus",
      "status": {
        "status_id": "1",
        "name": "New"
      },
      "priority": {
        "priority_id": "2",
        "name": "High",
        "color": "#FF8800"
      },
      "time_spent": 1.0,
      "assignee": {
        "assignee_id": "5",
        "name": "Viktor"
      },
      "purchases": [
        {
          "purchase_id": "1",
          "purchase": "Computer",
          "purchase_date": "2026-02-25",
          "price": 250,
          "shipping": 50,
          "outprice": 400,
          "comment": "..."
        }
      ],
      "total_purchase_cost": 300,
      "total_outprice": 400
    }
  ]
}
```

###
###### Response - (400 Bad Request)
```json
{
  "status": "Bad request",
  "message": "Invalid filter parameters"
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
### PATCH ``/api/customers/{id}``
Updates the active status of a customer

###### Request body
```json
{
  "active": false
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
###### Response - (404 Not Found)
```json
{
  "status": "Not found",
  "message": "Customer with id {id} not found"
}
```

###
###### Response - (400 Bad Request)
```json
{
  "status": "Bad request",
  "message": "Invalid active value"
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
___
### DELETE ``/api/customers/{id}/contacts/{contact_id}``
Deletes a contact belonging to a customer

###
###### Response - (200 OK)
```json
{
  "status": "200 OK",
  "message": "Contact belonging to customer with id {id} deleted successfully"
}
```

###
###### Response - (404 Not Found)
```json
{
  "status": "Not found",
  "message": "Contact with id {contact_id} not found"
}
```
## Users

### GET ``/api/users``
Returns a list of users and their respective permissions

###### Response - (200 OK)
```json
{
  "users": [
    {
      "user_id": "1",
      "username": "Tom",
      "permissions": {
        "create_errand": true,
        "create_report": true,
        "customers": true,
        "purchases": true,
        "users": true,
        "settings": true
      }
    }
  ]
}
```
___
### POST ``/api/users``
Creates a new user

###### Request body
```json
{
  "username": "Daniel",
  "password": "securePassword123",
  "permissions": {
    "create_errand": true,
    "create_report": false,
    "customers": true,
    "purchases": false,
    "users": false,
    "settings": false
  }
}
```

###
###### Response - (201 Created)
```json
{
  "user_id": "10",
  "username": "Daniel",
  "permissions": {
    "create_errand": true,
    "create_report": false,
    "customers": true,
    "purchases": false,
    "users": false,
    "settings": false
  }
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
### DELETE ``/api/users/{id}``
Deletes a user
###### Response - (200 OK)
```json
{
  "status": "200 OK",
  "message": "User with id {id} deleted successfully"
}
```

###
###### Response - (404 Not Found)
```json
{
  "status": "Not found",
  "message": "User with id {id} not found"
}
```
___
### PUT ``/api/users/{id}``
Updates a user

###### Request body
```json
{
  "username": "Daniel",
  "permissions": {
    "create_errand": true,
    "create_report": true,
    "customers": true,
    "purchases": true,
    "users": false,
    "settings": false
  }
}
```

###
###### Response - (200 OK)
```json
{
  "status": "200 OK",
  "message": "User with id {id} updated successfully"
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

## Assignees

### GET ``/api/assignees``
Returns a list of assignees

###### Response - (200 OK)
```json
{
  "assignees": [
    {
      "assignee_id": "1",
      "name": "Tom"
    }
  ]
}
```
___
### POST ``/api/assignees``
Creates a new assignee

###### Request body
```json
{
  "name": "Ronja"
}
```

###
###### Response - (201 Created)
```json
{
  "assignee_id": "6",
  "name": "Ronja"
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
### PUT ``/api/assignees/{id}``
Updates an assignee

###### Request body
```json
{
  "name": "Ronja Julia"
}
```

###
###### Response - (200 OK)
```json
{
  "status": "200 OK",
  "message": "Assignee with id {id} updated successfully"
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
### DELETE ``/api/assignees/{id}``
Deletes an assignee
###### Response - (200 OK)
```json
{
  "status": "200 OK",
  "message": "Assignee with id {id} deleted successfully"
}
```

###
###### Response - (404 Not Found)
```json
{
  "status": "Not found",
  "message": "Assignee with id {id} not found"
}
```
___
## Status
### GET ``/api/statuses``
Returns a list of all statuses in the system

###### Response - (200 OK)
```json
{
  "statuses": [
    {
      "status_id": "1",
      "name": "New"
    },
    {
      "status_id": "2",
      "name": "In Progress"
    }
  ]
}
```
___
### POST ``/api/statuses``
Creates a new status

###### Request body
```json
{
  "name": "Awaiting Approval"
}
```

###
###### Response - (201 Created)
```json
{
  "status_id": "6",
  "name": "Awaiting Approval"
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
### PUT ``/api/statuses/{id}``
Updates a status

###### Request body
```json
{
  "name": "Awaiting Customer Response"
}
```

###
###### Response - (200 OK)
```json
{
  "status": "200 OK",
  "message": "Status with id {id} updated successfully"
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
### DELETE ``/api/statuses/{id}``
Deletes a status
###### Response - (200 OK)
```json
{
  "status": "200 OK",
  "message": "Status with id {id} deleted successfully"
}
```

###
###### Response - (404 Not Found)
```json
{
  "status": "Not found",
  "message": "Status with id {id} not found"
}
```
___

## Priorities

### GET ``/api/priorities``
Returns a list of all priorities in the system

###### Response - (200 OK)
```json
{
  "priorities": [
    {
      "priority_id": "1",
      "name": "PANIC HIGH",
      "color": "#FF0000",
      "default": false
    },
    {
      "priority_id": "2",
      "name": "High",
      "color": "#FF8800",
      "default": false
    }
  ]
}
```
___
### POST ``/api/priorities``
Creates a new priority

###### Request body
```json
{
  "name": "Medium High",
  "color": "#FFA500",
  "default": false
}
```

###
###### Response - (201 Created)
```json
{
  "priority_id": "6",
  "name": "Medium High",
  "color": "#FFA500",
  "default": false
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
### PUT ``/api/priorities/{id}``
Updates a priority

###### Request body
```json
{
  "name": "Low",
  "color": "#29CC00",
  "default": false
}
```

###
###### Response - (200 OK)
```json
{
  "status": "200 OK",
  "message": "Priority with id {id} updated successfully"
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
### DELETE ``/api/priorities/{id}``
Deletes a priority
###### Response - (200 OK)
```json
{
  "status": "200 OK",
  "message": "Priority with id {id} deleted successfully"
}
```

###
###### Response - (404 Not Found)
```json
{
  "status": "Not found",
  "message": "Priority with id {id} not found"
}
```