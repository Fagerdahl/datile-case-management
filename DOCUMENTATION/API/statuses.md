## Status

### GET ``/api/statuses``
Returns a list of all statuses in the system

###### Response - (200 OK)
```json
{
  "statuses": [
    {
      "statusId": 1,
      "name": "New"
    },
    {
      "statusId": 2,
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
  "statusId": 3,
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
###
###### Response - (200 OK)
```json
{
  "status": "200 OK",
  "message": "Status with id {id} deleted successfully"
}
```

###
###### Response - (409 Conflict)
```json
{
  "status": "Conflict",
  "message": "Status with id {id} is referenced by existing errands"
}
```
___