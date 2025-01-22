# Job Explorer API

A NestJS-based REST API for job exploration platform with authentication and job posting features.

## Prerequisites

- Node.js (>=16.x)
- MySQL (>=8.0)
- npm or bun package manager

## Project Setup

1. **Database Setup**

```bash
# Import the database schema
mysql -u your_username -p your_database_name < wp_explorejobs.sql
```

2. **Environment Configuration**

```bash
# Copy environment file
cp .env.example .env

# Configure the following variables in .env:
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database
JWT_SECRET=your_jwt_secret
```

3. **Install Dependencies**

```bash
# Using npm
npm install

# Using bun
bun install
```

4. **Start the Application**

```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

The API will be available at `http://localhost:3000`
Swagger documentation: `http://localhost:3000/swagger/docs`

## API Documentation

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "User Name"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Job Posts

#### Get All Posts
```http
GET /posts
Authorization: Bearer {token}
```

#### Get Single Post
```http
GET /posts/{id}
Authorization: Bearer {token}
```

## Project Structure

```
src/
├── auth/           # Authentication module
├── common/         # Shared utilities and configurations
├── posts/          # Job posts module
├── users/          # User management module
└── swagger/        # API documentation
```

## API Features

1. **Authentication**
   - User registration and login
   - JWT-based authentication

2. **Job Posts**
   - Search and filter functionality
   - Pagination support

3. **Mobile App Integration**
   - Dedicated endpoints for mobile app
   - Optimized response formats

## Security Features

- JWT Authentication
- Input validation
- Rate limiting

