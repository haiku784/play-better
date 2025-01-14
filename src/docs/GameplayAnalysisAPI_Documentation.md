# Get Gear Recommendations API Documentation

## Endpoint
`POST /get_gear_recommendations`

### Description
This API endpoint retrieves personalized gear recommendations based on the gameplay metrics submitted by the user.

### Request Body
```json
{
    "user_id": "string",
    "metrics": {
        "kill_death_ratio": float,
        "completion_rate": float
    }
}
```

### Responses
- **200 OK**: Returns a list of recommended gear for the specified user.
    ```json
    {
        "user_id": "string",
        "recommendations": ["gear1", "gear2"]
    }
    ```
- **404 Not Found**: If no recommendations are available.
    ```json
    {
        "detail": "No recommendations found"
    }
    ```

### Example Request
```bash
curl -X POST http://localhost:8000/get_gear_recommendations "
-H "Content-Type: application/json" \
-d '{"user_id":"user123", "metrics":{"kill_death_ratio": 1.5, "completion_rate": 0.8}}'
```

### Example Response
```json
{
    "user_id": "user123",
    "recommendations": ["gear1", "gear2", "gear3"]
}
```