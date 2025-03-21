# WeFit365 API Documentation

## Authentication

All API requests require authentication:

1. API Key: Include `x-api-key` header with all requests
2. JWT Token: Include `Authorization: Bearer <token>` header for protected endpoints

## Endpoints

### User Management

#### Register User
- **URL**: `/api/users/register`
- **Method**: `POST`
- **Auth Required**: API Key
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword",
    "name": "John Doe",
    "age": 30,
    "gender": "male",
    "fitnessLevel": "intermediate",
    "fitnessGoals": ["Lose Weight", "Build Muscle"]
  }
  ```
