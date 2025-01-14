# Gameplay Metrics API Documentation

## Save Gameplay Metrics API

### Endpoint: `/save-metrics`

**Method:** POST

### Request Body:
```json
{
    "user_id": "string",
    "kills": "integer",
    "deaths": "integer",
    "objectives_completed": "integer",
    "preferences": {"key": "value"},
    "timestamp": "string"
}
```

### Responses:
- **200 OK**: Metrics saved successfully.
- **422 Unprocessable Entity**: Validation error (e.g., missing fields).

## Get Gameplay Metrics API

### Endpoint: `/get-metrics/{user_id}`

**Method:** GET

### Parameters:
- `user_id`: ID of the user to retrieve metrics for.
- `limit`: Optional limit for the number of results (default: 10).
- `skip`: Optional number of skipped results for pagination.

### Responses:
- **200 OK**: Returns a list of gameplay metrics.
- **404 Not Found**: No metrics found for the given user ID.
