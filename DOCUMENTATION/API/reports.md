## Reports

### GET ``/api/reports``
Returns a filtered list of errands for export

###### Query parameters (optional)
- ``dateFrom`` – Filter errands created from this date (ISO-8601, e.g. 2026-02-01T00:00:00Z)
- ``dateTo`` – Filter errands created to this date (ISO-8601, e.g. 2026-02-28T23:59:59Z)
- ``customerId`` – Filter by customer
- ``assigneeId`` – Filter by assignee
- ``statusIds`` – Comma separated list of status ids
- ``priorityIds`` – Comma separated list of priority ids
- ``sortBy`` – Field to sort by – customer | contact | title | status | priority | assignee | timeSpent (default customer)
- ``page`` – Page number (default 0)
- ``size`` – Page size (default 20)

###### Example request
```
/api/reports?dateFrom=2026-02-01T00:00:00Z&dateTo=2026-02-28T23:59:59Z&statusIds=1,2&priorityIds=3&page=0&size=20
```

###### Response - (200 OK)
```json
{
  "reports": [
    {
      "errandId": 1,
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
      "timeSpent": 1.0,
      "assignee": {
        "assigneeId": 5,
        "name": "Viktor"
      },
      "purchases": [
        {
          "purchaseId": 1,
          "purchase": "Computer",
          "purchaseDate": "2026-02-24T10:15:30Z",
          "price": 250,
          "shipping": 50,
          "outprice": 400,
          "comment": "..."
        }
      ],
      "totalPurchaseCost": 300,
      "totalOutprice": 400
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
  "message": "Invalid filter parameters"
}
```

___