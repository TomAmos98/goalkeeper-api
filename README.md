# Goalkeeper API

A REST API built with Node.js and Express for managing football goalkeepers and their statistics.

## Features

- Get all goalkeepers
- Get a goalkeeper by ID
- Create a goalkeeper
- Update a goalkeeper
- Delete a goalkeeper
- Filter goalkeepers by nationality
- Pagination with `page` and `limit`
- Input validation and sanitization
- Error handling
- JSON file storage
- Automated tests with Jest and Supertest
- Swagger/OpenAPI documentation

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

## Start the API

```bash
npm start
```

The API runs at:

```text
http://localhost:3000
```

Swagger documentation is available at:

```text
http://localhost:3000/api-docs/
```

## Run tests

```bash
npm test
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/goalkeepers` | Get all goalkeepers |
| GET | `/api/goalkeepers/:id` | Get goalkeeper by ID |
| POST | `/api/goalkeepers` | Create a goalkeeper |
| PUT | `/api/goalkeepers/:id` | Update a goalkeeper |
| DELETE | `/api/goalkeepers/:id` | Delete a goalkeeper |

## Filtering

Goalkeepers can be filtered by nationality.

Example:

```text
GET /api/goalkeepers?nationality=Sweden
```

## Pagination

Use `page` and `limit` to paginate the results.

Example:

```text
GET /api/goalkeepers?page=2&limit=1
```

## Example POST request

```json
{
  "name": "Alex Berg",
  "club": "Liverpool",
  "nationality": "Sweden",
  "age": 24,
  "league": "Premier League",
  "appearances": 18,
  "cleanSheets": 7,
  "savePercentage": 76
}
```

## Validation

The API validates goalkeeper data before it is saved.

- `name` is required
- `club` is required
- `nationality` is required
- `age` must be between 16 and 50
- `league` is required
- `appearances` must be 0 or higher
- `cleanSheets` must be 0 or higher
- `savePercentage` must be between 0 and 100

Text input is trimmed before being saved.

## Error handling

The API uses HTTP status codes to handle errors.

- `400` - Invalid input
- `404` - Goalkeeper not found
- `500` - Internal server error

## Data storage

Goalkeeper data is stored in:

```text
data/goalkeepers.json
```

## Testing

The project uses Jest and Supertest for automated API testing.

The project has been developed mainly using a Test-Driven Development (TDD) workflow:

1. Write a failing test
2. Implement the functionality
3. Run the tests until they pass
4. Refactor when needed

## API Documentation

Generated OpenAPI documentation is provided using Swagger.

Start the API with:

```bash
npm start
```

Then open:

```text
http://localhost:3000/api-docs/
```

## Technologies

- Node.js
- Express
- express-validator
- Jest
- Supertest
- Swagger / OpenAPI