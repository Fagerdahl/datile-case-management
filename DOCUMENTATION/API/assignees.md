## Assignees

### GET ``/api/assignees``
Returns a list of assignees

###### Response - (200 OK)
```json
{
  "assignees": [
    {
      "assigneeId": 1,
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
  "assigneeId": 2,
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
###
###### Response - (200 OK)
```json
{
  "status": "200 OK",
  "message": "Assignee with id {id} deleted successfully"
}
```

###
###### Response - (409 Conflict)
```json
{
  "status": "Conflict",
  "message": "Assignee with id {id} is referenced by existing errands"
}
```
___