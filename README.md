# Job Explorer API

![API Demo](./API%20Picture%20Demo.png)

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


#### Get All Job Posts

```http
GET /api/client/posts/jobs
Authorization: Bearer {token}
```

##### Query Parameters

| Parameter  | Type     | Default  | Description                                           |
|------------|----------|----------|-------------------------------------------------------|
| search     | string   | -        | Search in job titles (e.g. "developer")              |
| status     | string   | publish  | Filter by status: 'publish', 'draft', 'private'      |
| page       | number   | 1        | Page number for pagination                           |
| limit      | number   | 10       | Number of items per page (max: 100)                 |
| sortBy     | string   | post_date| Sort field: 'post_date', 'post_title'               |
| sortOrder  | string   | DESC     | Sort direction: 'ASC', 'DESC'                       |

##### Example Request

```http
GET /api/client/posts/jobs?search=developer&status=publish&page=1&limit=10&sortBy=post_date&sortOrder=DESC
```

##### Example Response

```json
{
  "data": [
    {
      "id": 1,
      "title": "Senior Developer",
      "excerpt": "We are looking for a senior developer...",
      "date": "2024-01-23T00:00:00.000Z",
      "meta": {
        "salary": "100,000 - 120,000 / year",
        "experience": "5 years",
        "company_id": 123,
        "cover_image": "http://api.example.com/media/456/thumbnail",
        "valid_until": "2024-02-23"
      }
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

##### Response Codes

| Status | Description           |
|--------|-----------------------|
| 200    | Success              |
| 400    | Invalid parameters   |
| 500    | Server error         |

### Get Job Post Details

```http
GET /api/client/posts/jobs/{id}
Authorization: Bearer {token}
```

##### Parameters

| Parameter | Type     | Description     |
|-----------|----------|-----------------|
| id        | number   | Job post ID     |

##### Example Response

```json
{
  "id": 1,
  "author": 1,
  "date": "2024-01-23T00:00:00.000Z",
  "title": "Senior Developer",
  "content": "<p>Detailed job description...</p>",
  "excerpt": "We are looking for a senior developer...",
  "status": "publish",
  "type": "job",
  "meta": {
    "salary": "100,000 - 120,000 / year",
    "experience": "5 years",
    "company_id": 123,
    "cover_image": "http://api.example.com/media/456/thumbnail",
    "valid_until": "2024-02-23",
    "benefits": ["Medical", "401k", "Remote Work"],
    "job_location": "New York, NY",
    "employment_type": "Full-time"
  }
}
```

##### Response Codes

| Status | Description           |
|--------|-----------------------|
| 200    | Success              |
| 400    | Invalid ID format    |
| 404    | Job not found        |
| 500    | Server error         |

#### Features

- **Search**: Full-text search in job titles and content
- **Filtering**: Filter by post status
- **Pagination**: Page-based pagination with customizable limits
- **Sorting**: Sort by date or title in ascending or descending order

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

## Security Features

- JWT Authentication
- Input validation
- Rate limiting

