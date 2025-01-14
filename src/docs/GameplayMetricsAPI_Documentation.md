# Gameplay Metrics API Documentation

## Endpoints

### Save Gameplay Metrics
- **POST** `/gameplay_metrics/save`
- **Request Body**:
    - `user_id`: str
    - `session_id`: str
    - `kills`: int
    - `deaths`: int
    - `objectives_completed`: int

- **Response**:
    - Returns performance insights including `kill_death_ratio` and `completion_rate`.

### Get Gameplay Metrics
- **GET** `/gameplay_metrics/{user_id}`
- **Response**:
    - Returns a list of gameplay metrics for the specified user. If no metrics found, returns 404.

## Examples
### Save Gameplay Metrics Example
```json
{
    "user_id": "user1",
    "session_id": "session1",
    "kills": 10,
    "deaths": 5,
    "objectives_completed": 2
}
```

### Get Gameplay Metrics Example
```json
GET /gameplay_metrics/user1
```
