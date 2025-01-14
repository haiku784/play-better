# Get Highlights API Endpoint

## Description
This endpoint allows users to retrieve their gameplay highlights by providing a user ID and gameplay session ID. It returns the highlights along with metadata such as timestamps and highlight types.

## Request Parameters
- **user_id** (path parameter): The ID of the user whose highlights are to be retrieved.
- **session_id** (path parameter): The ID of the gameplay session from which highlights are being retrieved.

## Responses
- **200 OK**: Returns a JSON object containing a list of highlights.
    ```json
    {
        "highlights": [
            {
                "user_id": "user_1",
                "session_id": "session_1",
                "highlight_id": "highlight_1",
                "timestamp": "2023-10-01T00:00:00Z",
                "highlight_type": "kill",
                "video_segment_link": "http://example.com/video1.mp4"
            }
        ]
    }
    ```
- **403 Forbidden**: If the user does not have permission.
- **404 Not Found**: If no highlights are found for the specified session ID.

## Example Request
```http
GET /highlights/user_1/session_1
```

## Example Response
```json
{
    "highlights": [
        {
            "user_id": "user_1",
            "session_id": "session_1",
            "highlight_id": "highlight_1",
            "timestamp": "2023-10-01T00:00:00Z",
            "highlight_type": "kill",
            "video_segment_link": "http://example.com/video1.mp4"
        }
    ]
}
```