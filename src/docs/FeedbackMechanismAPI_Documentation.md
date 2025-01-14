# Feedback Mechanism API Documentation

## Overview
This document outlines the functionality and usage of the Feedback Mechanism API that processes user feedback and generates gameplay gear recommendations based on their performance metrics.

## Endpoints
### Submit Feedback
- **Endpoint**: POST /feedback
- **Request Body**:
  - `user_id`: str
  - `gear_id`: str
  - `rating`: int (between 1 and 5)
  - `comments`: str
- **Response**:
  - `recommendations`: List[str]

### Save Feedback Analysis
- **Endpoint**: POST /feedback-analysis
- **Request Body**:
  - `user_id`: str
  - `gear_id`: str
  - `aggregated_ratings`: float
  - `insights`: str
- **Response**:
  - `message`: str

### Retrieve Feedback Analysis
- **Endpoint**: GET /feedback-analysis/{user_id}
- **Path Parameters**:
  - `user_id`: str
- **Response**:
  - List of FeedbackAnalysis objects

## Usage Example
### Submit Feedback Example
```json
{
  "user_id": "12345",
  "gear_id": "gear_abc",
  "rating": 5,
  "comments": "Great experience!"
}
```
### Save Feedback Analysis Example
```json
{
  "user_id": "12345",
  "gear_id": "gear_abc",
  "aggregated_ratings": 4.8,
  "insights": "User prefers lightweight gear."
}
```