# WeFit365 Backend API Documentation

## Overview

WeFit365 is an AI-powered fitness application that generates personalized workout plans. This repository contains the backend API that powers the application, providing authentication, workout plan management, and AI-generated fitness recommendations.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [User Management](#user-management)
  - [Workout Plans](#workout-plans)
  - [Workout Sessions](#workout-sessions)
  - [AI Integration](#ai-integration)
- [Database Schema](#database-schema)
- [Security](#security)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with JWT and refresh tokens
- User profile management
- AI-generated workout plans based on user preferences
- Workout session logging and tracking
- Secure API with rate limiting and data sanitization
- MongoDB Atlas integration
- Comprehensive error handling and validation

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wefit365-backend.git
cd wefit365-backend
