# API Documentation for Playback Metadata Endpoints

## Save Playback Metadata
**Endpoint:** `POST /save_playback_metadata`

### Request Body
```json
{
    "session_id": "string",
    "playback_speed": float,
    "user_preferences": {"key": "value"}
}
```
### Response
- **200 OK:** Success response with metadata saved.
- **422 Unprocessable Entity:** Validation errors in the request data.

## Get Playback Metadata
**Endpoint:** `GET /get_playback_metadata/{session_id}`

### Response
- **200 OK:** Retrieved playback metadata.
- **404 Not Found:** Metadata not found for the given session ID.