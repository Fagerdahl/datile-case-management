## Errands

### GET ``/api/errands``
Returns a filtered, sorted and paginated list of errands

###### Query parameters (optional)
- ``search`` – Text filter using contains (matches title and description)
- ``customerId`` – Filter by customer
- ``assigneeId`` – Filter by assignee
- ``statusIds`` – Comma separated list of status ids
- ``priorityIds`` – Comma separated list of priority ids
- ``sortBy`` – Field to sort by – customer | contact | title | status | priority | assignee | time_spent | date (default date)
- ``sortDir`` – asc | desc (default asc)
- ``page`` – Page number (default 0)
- ``size`` – Page size (default 20)

###### Example request
```
/api/errands?search=server&statusIds=1,2&priorityIds=2,5&sortBy=title&sortDir=desc&page=0&size=20
```

###### Response - (200 OK)
```json
{
  "errands": [
    {
      "errandId": 1,
      "createdAt": "2026-02-24T10:15:30Z",
      "title": "Server installation",
      "timeSpent": 1.0,
      "assignee": {
        "assigneeId": 5,
        "name": "Viktor"
      },
      "customer": {
        "customerId": 3,
        "name": "AJ Tryckluft"
      },
      "contact": {
        "contactId": 1,
        "firstName": "John",
        "lastName": "Doe",
        "phoneNumber": "0701234567",
        "mail": "johndoe@gmail.com"
      },
      "status": {
        "statusId": 1,
        "name": "New"
      },
      "priority": {
        "priorityId": 2,
        "name": "High",
        "color": "#FF8800"
      },
      "history": [
        {
          "description": "I did a thing",
          "verifiedName": "Tom",
          "createdAt": "2026-02-25T12:00:00Z"
        }
      ]
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 1,
  "totalPages": 1
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
  "errandId": 1,
  "createdAt": "2026-02-25T12:00:00Z",
  "title": "Test errand",
  "assignee": {
    "assigneeId": 5,
    "name": "Tom"
  },
  "customer": {
    "customerId": 3,
    "name": "John Doe AB"
  },
  "contact": {
    "contactId": 1,
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "0701234567",
    "mail": "johndoe@gmail.com"
  },
  "history": [
    {
      "description": "I did a thing",
      "verifiedName": "Tom",
      "createdAt": "2026-02-25T12:00:00Z"
    }
  ],
  "description": "Johns errand description",
  "timeSpent": 1,
  "status": {
    "statusId": 1,
    "name": "New"
  },
  "priority": {
    "priorityId": 2,
    "name": "High",
    "color": "#FF8800"
  },
  "purchases": [
    {
      "purchaseId": 1,
      "purchase": "Computer",
      "purchaseDate": "2026-02-25T12:00:00Z",
      "price": 250,
      "shipping": 50,
      "outprice": 400,
      "comment": "..."
    }
  ],
  "agreedPrice": 150
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
  "assigneeId": 5,
  "customerId": 3,
  "contactId": 1,
  "description": "Johns errand description",
  "timeSpent": 1,
  "statusId": 1,
  "priorityId": 2,
  "purchases": [
    {
      "purchase": "Computer",
      "purchaseDate": "2026-02-25T12:00:00Z",
      "price": 250,
      "shipping": 50,
      "outprice": 400,
      "comment": "..."
    }
  ],
  "agreedPrice": 150
}
```

###
###### Response – (201 Created)
```json
{
  "errandId": 1,
  "createdAt": "2026-02-25T12:00:00Z",
  "title": "Test errand",
  "assignee": {
    "assigneeId": 5,
    "name": "Tom"
  },
  "customer": {
    "customerId": 3,
    "name": "John Doe AB"
  },
  "contact": {
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "0701234567",
    "mail": "johndoe@gmail.com"
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

### PUT ``/api/errands/{id}``
Updates an errand

###### Request body
```json
{
  "title": "Test errand",
  "assigneeId": 5,
  "customerId": 3,
  "contactId": 1,
  "timeSpent": 1,
  "statusId": 1,
  "priorityId": 2,
  "purchases": [
    {
      "purchaseId": 1,
      "purchase": "Computer",
      "purchaseDate": "2026-02-25T12:00:00Z",
      "price": 250,
      "shipping": 50,
      "outprice": 400,
      "comment": "..."
    }
  ],
  "agreedPrice": 150
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

### POST ``/api/errands/{id}/history``
Adds a new history entry (append-only)

###### Request body
```json
{
  "description": "Installed antivirus"
}
```

###
###### Response - (201 Created)
```json
{
  "description": "Installed antivirus",
  "verifiedName": "Tom",
  "createdAt": "2026-02-25T13:45:00Z"
}
```