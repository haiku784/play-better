# Gameplay Metadata API Documentation

## Upload Recorded Session

### POST /upload-session/

Allows users to upload recorded gameplay sessions.

**Request Body**:
- `file`: The recorded session file to be uploaded.

**Responses**:
- `200 OK`: Returns a success message if the upload is successful.
- `500 Internal Server Error`: Returns an error message if the upload fails.

### Example Request
```json
{
    "file": "test_video.mp4"
}
```

### Example Response
```json
{
    "message": "Upload successful!"
}
```