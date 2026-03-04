## Customers

### GET ``/api/customers``
Returns a list of customers and their respective contacts

###### Query parameters (optional)
- ``active`` – true | false (default true)

###### Response - (200 OK)
```json
{
  "customers": [
    {
      "customerId": 1,
      "customer": "Hultelid",
      "fortnoxId": "00000",
      "active": true,
      "contacts": [
        {
          "contactId": 1,
          "firstName": "John",
          "lastName": "Doe",
          "phoneNumber": "0701234567",
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
  "fortnoxId": "00001"
}
```

###
###### Response - (201 Created)
```json
{
  "customerId": 2,
  "customer": "John Doe AB",
  "fortnoxId": "00001",
  "active": true
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

___

### DELETE ``/api/customers/{id}``
Deletes a customer (only if not referenced by errands)

###
###### Response - (200 OK)
```json
{
  "status": "200 OK",
  "message": "Customer with id {id} deleted successfully"
}
```

###
###### Response - (409 Conflict)
```json
{
  "status": "Conflict",
  "message": "Customer with id {id} is referenced by existing errands"
}
```

___

### POST ``/api/customers/{id}/contacts``
Creates a new contact for a customer

###### Request body
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "phoneNumber": "0701234567",
  "mail": "janedoe@gmail.com"
}
```

###
###### Response – (201 Created)
```json
{
  "contactId": 2,
  "firstName": "Jane",
  "lastName": "Doe",
  "phoneNumber": "0701234567",
  "mail": "janedoe@gmail.com"
}
```

___

### PUT ``/api/customers/{id}/contacts/{contactId}``
Updates a contact for a customer
###### Request body
```json
{
  "firstName": "Jane",
  "lastName": "Doen't",
  "phoneNumber": "0701234567",
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
### DELETE ``/api/customers/{id}/contacts/{contactId}``
Deletes a contact connected to a customer
###### Response - (200 OK)
```json
{
  "status": "200 OK",
  "message": "Contact belonging to customer with id {id} deleted successfully"
}
```

###
###### Response - (409 Conflict)
```json
{
  "status": "Conflict",
  "message": "Contact with id {id} is referenced by existing errands"
}
```
___