# Get Comparative Metrics API Documentation

## Overview
The Get Comparative Metrics API retrieves comparative gear metrics for a specific user stored in the MongoDB database.

## Endpoint
`GET /comparative-metrics/`

## Query Parameters
- `user_id` (string): The ID of the user.

## Response Format
- **200 OK**: Returns a list of gear metrics for the specified user.
  - Example Response:
    ```json
    [
        {
            "gear_option_id": "gear123",
            "user_id": "test_user",
            "metrics": {
                "price": 99.99,
                "features": ["lightweight", "durable"],
                "user_ratings": 4.5
            },
            "timestamp": "2023-10-01T00:00:00Z"
        }
    ]
    ```

- **404 Not Found**: If no metrics are found for the specified user.
  - Example Response:
    ```json
    {"detail": "No metrics found for this user"}
    ```
