## Users

### GET ``/api/users``
Returns a list of users and their respective permissions
###### Response - (200 OK)
```json
{
  "users": [
    {
      "user_id": 1,
      "username": "Tom",
      "permissions": {
        "createErrand": true,
        "createReport": true,
        "customers": true,
        "purchases": true,
        "users": true,
        "settings": true
      }
    }
  ]
}
```

### POST ``/api/users``
Creates a new user

###### Request body
```json
{
  "username": "Daniel",
  "password": "securePassword123",
  "permissions": {
    "createErrand": true,
    "createReport": false,
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
  "user_id": 2,
  "username": "Daniel",
  "permissions": {
    "createErrand": true,
    "createReport": false,
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

### PUT ``/api/users/{id}``
Updates a user

###### Request body
```json
{
  "username": "Daniel",
  "permissions": {
    "createErrand": true,
    "createReport": true,
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
###### Response - (409 Conflict)
```json
{
  "status": "Conflict",
  "message": "User with id {id} is referenced by existing errands"
}
```
___