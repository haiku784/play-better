# Gear Recommendations API Documentation

## Overview
This API provides personalized gear recommendations based on user gameplay metrics.

## Endpoints
### POST /get-gear-recommendations/
#### Request Body
- **user_id** (string): User's unique identifier
- **kills** (integer): Number of kills
- **deaths** (integer): Number of deaths
- **objectives_completed** (integer): Number of objectives completed

#### Response
- **gear_ids** (array): List of recommended gear IDs
- **timestamp** (string): Timestamp of recommendations

## Example Request
```json
{
    "user_id": "test_user",
    "kills": 12,
    "deaths": 3,
    "objectives_completed": 5
}
```

## Example Response
```json
{
    "gear_ids": ["gear_id_1", "gear_id_2"],
    "timestamp": "2023-10-01T12:00:00Z"
}
```