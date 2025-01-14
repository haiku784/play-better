# Gear Recommendations API

## Overview
This API provides personalized gear recommendations based on user gameplay metrics.

## Endpoint
### POST /gear-recommendations

## Request Body
- **user_id** (str): The unique identifier for the user.
- **gameplay_metrics** (dict): A dictionary containing gameplay performance metrics. Example:
  ```json
  {
      "kills": 10,
      "deaths": 2
  }
  ```

## Response
- **user_id** (str): The user ID for which recommendations are provided.
- **recommendations** (list): A list of recommended gear items.

## Example Request
```bash
curl -X POST "http://localhost:8000/gear-recommendations" -H "Content-Type: application/json" -d '{"user_id": "12345", "gameplay_metrics": {"kills": 10, "deaths": 2}}'
```

## Example Response
```json
{
    "user_id": "12345",
    "recommendations": ["Gear1", "Gear2", "Gear3"]
}
```

## Error Handling
- Returns a `400` status code if input data is invalid.
- Returns a `500` status code if there is an issue storing recommendations in the database.