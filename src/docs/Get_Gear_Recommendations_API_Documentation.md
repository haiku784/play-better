# Get Gear Recommendations API

## Endpoint
### `POST /recommend-gear`
- **Description**: Generates gear recommendations based on user gameplay metrics.
- **Request Body**:
  ```json
  {
      "user_id": "string",
      "gameplay_metrics": {
          "kills": integer,
          "deaths": integer,
          // more metrics
      }
  }
  ```
- **Responses**:
  - **200 OK**: Returns a list of recommended gears.
    ```json
    {
        "recommendations": ["Gear A", "Gear B"]
    }
    ```
  - **500 Internal Server Error**: If there's an issue with processing the request.

### `GET /get-recommendations/{user_id}`
- **Description**: Retrieves previous gear recommendations for a user based on user ID.
- **Responses**:
  - **200 OK**: Returns a list of previous recommendations.
    ```json
    [
        {
            "user_id": "user123",
            "recommended_gears": ["Gear A", "Gear B"]
        }
    ]
    ```
  - **500 Internal Server Error**: If there's an issue with fetching recommendations.