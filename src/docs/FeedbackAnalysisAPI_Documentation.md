# Feedback Analysis API Documentation

## Endpoints

### POST /feedback-analysis
- **Description**: Saves feedback analysis results.
- **Request Body**: FeedbackAnalysisSchema object.
- **Responses**:
  - `200 OK` if the analysis is saved successfully.
  - `400 Bad Request` if validation fails.

### GET /feedback-analysis
- **Description**: Retrieves feedback analysis results filtered by user ID and/or gear ID.
- **Query Parameters**:
  - `user_id`: Optional filter for user ID.
  - `gear_id`: Optional filter for gear ID.
- **Responses**:
  - `200 OK` with list of FeedbackAnalysisSchema objects.
  - `400 Bad Request` if there are issues with the query.
