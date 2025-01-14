# Gaming Preferences API Documentation

## Endpoint
### POST /submit_preferences/

### Description
Allows users to submit their gaming preferences.

### Request Body
```json
{
    "user_id": "string",
    "favorite_games": ["string"],
    "play_style": "string",
    "budget": "number"
}
```

### Responses
- **200 OK**: Preferences submitted successfully.
- **400 Bad Request**: If the user ID already exists.

### Example Request
```json
{
    "user_id": "user123",
    "favorite_games": ["Game A", "Game B"],
    "play_style": "strategic",
    "budget": 50.0
}
```

### Example Response
```json
{
    "message": "Preferences submitted successfully!"
}
```