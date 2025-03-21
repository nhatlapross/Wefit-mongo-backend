WeFit365 Backend API Documentation
Overview
WeFit365 is an AI-powered fitness application that generates personalized workout plans. This repository contains the backend API that powers the application, providing authentication, workout plan management, and AI-generated fitness recommendations.
Table of Contents

Features
Getting Started

Prerequisites
Installation
Environment Variables


API Documentation

Authentication
User Management
Workout Plans
Workout Sessions
AI Integration


Database Schema
Security
Deployment
Testing
Contributing
License

Features

User authentication with JWT and refresh tokens
User profile management
AI-generated workout plans based on user preferences
Workout session logging and tracking
Secure API with rate limiting and data sanitization
MongoDB Atlas integration
Comprehensive error handling and validation

Getting Started
Prerequisites

Node.js (v14 or later)
MongoDB Atlas account or local MongoDB instance
npm or yarn

Installation

Clone the repository:

bashCopygit clone https://github.com/yourusername/wefit365-backend.git
cd wefit365-backend

Install dependencies:

bashCopynpm install

Create a .env file based on the .env.example template
Start the development server:

bashCopynpm run dev
Environment Variables
Create a .env file in the root directory with the following variables:
CopyPORT=5000
MONGODB_URI=mongodb+srv://wefit365:<db_password>@cluster0.h63jd.mongodb.net/wefit365?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret_here
API_KEY=your_secure_api_key_here
NODE_ENV=development
Replace <db_password> with your actual MongoDB Atlas password, and use secure values for JWT_SECRET and API_KEY.
API Documentation
All API requests require an API key sent in the x-api-key header. Protected routes also require a JWT token in the Authorization header using the Bearer scheme.
Authentication
Register a New User
CopyPOST /api/users/register
Headers:

Content-Type: application/json
x-api-key: YOUR_API_KEY

Request Body:
jsonCopy{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe",
  "age": 30,
  "gender": "male",
  "fitnessLevel": "intermediate",
  "fitnessGoals": ["Lose Weight", "Build Muscle"]
}
Response:
jsonCopy{
  "message": "User registered successfully",
  "user": {
    "_id": "614a5b2c8e7d5b001c3e5a1b",
    "email": "user@example.com",
    "name": "John Doe",
    "age": 30,
    "gender": "male",
    "fitnessLevel": "intermediate",
    "fitnessGoals": ["Lose Weight", "Build Muscle"]
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Login
CopyPOST /api/users/login
Headers:

Content-Type: application/json
x-api-key: YOUR_API_KEY

Request Body:
jsonCopy{
  "email": "user@example.com",
  "password": "securepassword"
}
Response:
jsonCopy{
  "message": "Login successful",
  "user": {
    "_id": "614a5b2c8e7d5b001c3e5a1b",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "60a5644f23ea3458248b4567..."
}
Refresh Token
CopyPOST /api/users/refresh-token
Headers:

Content-Type: application/json
x-api-key: YOUR_API_KEY

Request Body:
jsonCopy{
  "refreshToken": "60a5644f23ea3458248b4567..."
}
Response:
jsonCopy{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "70b6755f34fb4569359c5678..."
}
Logout
CopyPOST /api/users/logout
Headers:

Content-Type: application/json
x-api-key: YOUR_API_KEY
Authorization: Bearer YOUR_ACCESS_TOKEN

Request Body:
jsonCopy{
  "refreshToken": "60a5644f23ea3458248b4567..."
}
Response:
jsonCopy{
  "message": "Logged out successfully"
}
User Management
Get User Profile
CopyGET /api/users/:id
Headers:

x-api-key: YOUR_API_KEY
Authorization: Bearer YOUR_ACCESS_TOKEN

Response:
jsonCopy{
  "_id": "614a5b2c8e7d5b001c3e5a1b",
  "email": "user@example.com",
  "name": "John Doe",
  "age": 30,
  "gender": "male",
  "fitnessLevel": "intermediate",
  "fitnessGoals": ["Lose Weight", "Build Muscle"]
}
Update User Profile
CopyPUT /api/users/:id
Headers:

Content-Type: application/json
x-api-key: YOUR_API_KEY
Authorization: Bearer YOUR_ACCESS_TOKEN

Request Body:
jsonCopy{
  "name": "John Smith",
  "age": 31,
  "fitnessGoals": ["Build Muscle", "Improve Endurance"]
}
Response:
jsonCopy{
  "message": "Profile updated successfully",
  "user": {
    "_id": "614a5b2c8e7d5b001c3e5a1b",
    "email": "user@example.com",
    "name": "John Smith",
    "age": 31,
    "gender": "male",
    "fitnessLevel": "intermediate",
    "fitnessGoals": ["Build Muscle", "Improve Endurance"]
  }
}
Workout Plans
Get User Workout Plans
CopyGET /api/users/:id/workout-plans
Headers:

x-api-key: YOUR_API_KEY
Authorization: Bearer YOUR_ACCESS_TOKEN

Response:
jsonCopy[
  {
    "_id": "614b6c3d9f8e6c002d4f6b2c",
    "userId": "614a5b2c8e7d5b001c3e5a1b",
    "planName": "Intermediate Lose Weight Plan",
    "duration": "8 weeks",
    "daysPerWeek": 4,
    "focusAreas": ["Lose Weight", "Build Muscle"],
    "workouts": [...]
  }
]
Get Specific Workout Plan
CopyGET /api/workout-plans/:id
Headers:

x-api-key: YOUR_API_KEY
Authorization: Bearer YOUR_ACCESS_TOKEN

Response:
jsonCopy{
  "_id": "614b6c3d9f8e6c002d4f6b2c",
  "userId": "614a5b2c8e7d5b001c3e5a1b",
  "planName": "Intermediate Lose Weight Plan",
  "duration": "8 weeks",
  "daysPerWeek": 4,
  "focusAreas": ["Lose Weight", "Build Muscle"],
  "workouts": [
    {
      "day": 1,
      "focus": "Upper Body",
      "duration": "45 minutes",
      "exercises": [
        {
          "name": "Push-ups",
          "sets": 3,
          "reps": "12-15",
          "rest": "60 sec"
        },
        {
          "name": "Dumbbell Rows",
          "sets": 3,
          "reps": "10-12",
          "rest": "60 sec"
        }
      ]
    }
  ]
}
Workout Sessions
Log Workout Session
CopyPOST /api/workout-sessions
Headers:

Content-Type: application/json
x-api-key: YOUR_API_KEY
Authorization: Bearer YOUR_ACCESS_TOKEN

Request Body:
jsonCopy{
  "userId": "614a5b2c8e7d5b001c3e5a1b",
  "workoutPlanId": "614b6c3d9f8e6c002d4f6b2c",
  "day": 1,
  "focus": "Upper Body",
  "startTime": "2023-10-20T08:30:00.000Z",
  "endTime": "2023-10-20T09:15:00.000Z",
  "duration": 45,
  "exercises": [
    {
      "name": "Push-ups",
      "sets": [
        { "weight": 0, "reps": 12, "completed": true },
        { "weight": 0, "reps": 10, "completed": true },
        { "weight": 0, "reps": 8, "completed": true }
      ]
    },
    {
      "name": "Dumbbell Rows",
      "sets": [
        { "weight": 15, "reps": 12, "completed": true },
        { "weight": 15, "reps": 12, "completed": true },
        { "weight": 15, "reps": 10, "completed": true }
      ]
    }
  ],
  "notes": "Felt strong today!",
  "rating": 4
}
Response:
jsonCopy{
  "message": "Workout session logged successfully",
  "workoutSession": {
    "_id": "614c7d4ea0bf7d003e5f7c3d",
    "userId": "614a5b2c8e7d5b001c3e5a1b",
    "workoutPlanId": "614b6c3d9f8e6c002d4f6b2c",
    "day": 1,
    "focus": "Upper Body",
    "startTime": "2023-10-20T08:30:00.000Z",
    "endTime": "2023-10-20T09:15:00.000Z",
    "duration": 45,
    "exercises": [...],
    "notes": "Felt strong today!",
    "rating": 4
  }
}
Get User Workout History
CopyGET /api/users/:id/workout-history?start=2023-10-01&end=2023-10-31&limit=20
Headers:

x-api-key: YOUR_API_KEY
Authorization: Bearer YOUR_ACCESS_TOKEN

Response:
jsonCopy[
  {
    "_id": "614c7d4ea0bf7d003e5f7c3d",
    "userId": "614a5b2c8e7d5b001c3e5a1b",
    "workoutPlanId": "614b6c3d9f8e6c002d4f6b2c",
    "day": 1,
    "focus": "Upper Body",
    "startTime": "2023-10-20T08:30:00.000Z",
    "endTime": "2023-10-20T09:15:00.000Z",
    "duration": 45,
    "exercises": [...],
    "notes": "Felt strong today!",
    "rating": 4
  }
]
AI Integration
Generate Workout Plan
CopyPOST /api/ai/generate-workout-plan
Headers:

Content-Type: application/json
x-api-key: YOUR_API_KEY
Authorization: Bearer YOUR_ACCESS_TOKEN

Request Body:
jsonCopy{
  "userId": "614a5b2c8e7d5b001c3e5a1b",
  "fitnessGoals": ["Lose Weight", "Build Muscle"],
  "fitnessLevel": "intermediate",
  "availability": {
    "daysPerWeek": 4,
    "timePerWorkout": 45
  },
  "equipment": {
    "location": "Gym",
    "available": ["Dumbbells", "Barbells", "Bench"]
  },
  "limitations": "Slight lower back pain",
  "preferences": {
    "likes": "Weight training, HIIT",
    "dislikes": "Running, Burpees"
  }
}
Response:
jsonCopy{
  "_id": "614b6c3d9f8e6c002d4f6b2c",
  "userId": "614a5b2c8e7d5b001c3e5a1b",
  "planName": "Intermediate Lose Weight Plan",
  "duration": "8 weeks",
  "daysPerWeek": 4,
  "focusAreas": ["Lose Weight", "Build Muscle"],
  "workouts": [...]
}
Database Schema
User
javascriptCopy{
  email: String (required, unique),
  password: String (required, hashed),
  name: String (required),
  age: Number,
  gender: String (enum: ['male', 'female', 'other', 'prefer not to say']),
  height: Number,
  weight: Number,
  fitnessLevel: String (enum: ['beginner', 'intermediate', 'advanced']),
  fitnessGoals: [String],
  healthLimitations: String,
  preferences: {
    likes: String,
    dislikes: String
  },
  createdAt: Date,
  updatedAt: Date
}
WorkoutPlan
javascriptCopy{
  userId: ObjectId (ref: 'User'),
  planName: String (required),
  duration: String (required),
  daysPerWeek: Number (required),
  focusAreas: [String],
  workouts: [
    {
      day: Number (required),
      focus: String (required),
      duration: String,
      exercises: [
        {
          name: String (required),
          sets: Number (required),
          reps: String (required),
          rest: String,
          notes: String
        }
      ]
    }
  ],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
WorkoutSession
javascriptCopy{
  userId: ObjectId (ref: 'User'),
  workoutPlanId: ObjectId (ref: 'WorkoutPlan'),
  day: Number,
  focus: String,
  startTime: Date (required),
  endTime: Date,
  duration: Number, // in minutes
  exercises: [
    {
      exerciseId: String,
      name: String (required),
      sets: [
        {
          weight: Number,
          reps: Number,
          completed: Boolean
        }
      ],
      notes: String
    }
  ],
  notes: String,
  rating: Number, // 1-5
  createdAt: Date
}
RefreshToken
javascriptCopy{
  userId: ObjectId (ref: 'User'),
  token: String (required),
  expires: Date (required),
  createdAt: Date
}
Security
The API implements several security measures:

JWT authentication with short-lived access tokens and refresh tokens
API key requirement for all endpoints
Password hashing using bcrypt
Rate limiting to prevent brute force attacks
Data sanitization to prevent NoSQL injection and XSS attacks
HTTPS enforcement in production
Request validation using Joi
Proper error handling and logging

Deployment
Deploying to a VPS or Cloud Provider

Clone the repository on your server
Install dependencies:

bashCopynpm install --production

Set up environment variables in a .env file
Start the server:

bashCopynpm start
Using Docker

Build the Docker image:

bashCopydocker build -t wefit365-backend .

Run the container:

bashCopydocker run -p 5000:5000 --env-file .env wefit365-backend
Using Docker Compose
bashCopydocker-compose up -d
Testing
The API includes a test suite built with Jest and Supertest:
bashCopynpm test
Contributing

Fork the repository
Create a feature branch:

bashCopygit checkout -b feature/your-feature-name

Commit your changes:

bashCopygit commit -m 'Add some feature'

Push to the branch:

bashCopygit push origin feature/your-feature-name

Create a pull request

License
This project is licensed under the MIT License - see the LICENSE file for details.
