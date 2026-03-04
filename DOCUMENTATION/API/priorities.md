## Priorities

### GET ``/api/priorities``
Returns a list of all priorities in the system

###### Response - (200 OK)
```json
{
  "priorities": [
    {
      "priorityId": 1,
      "name": "PANIC HIGH",
      "color": "#FF0000",
      "default": false
    },
    {
      "priorityId": 2,
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
  "priorityId": 3,
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
###
###### Response - (200 OK)
```json
{
  "status": "200 OK",
  "message": "Priority with id {id} deleted successfully"
}
```

###
###### Response - (409 Conflict)
```json
{
  "status": "Conflict",
  "message": "Priority with id {id} is referenced by existing errands"
}
```