# School Finder API

A simple API for managing and finding schools based on geographical location. This API allows you to add new schools to the database and find nearby schools based on your current coordinates.

## API Endpoints

### 1. Add a School

Add a new school to the database.

```
POST /api/v1/addSchool
```

**Request Body:**
```json
{
  "name": "Example School",
  "address": "123 Education Street, City, Country",
  "latitude": 37.7749,
  "longitude": -122.4194
}
```

**Parameters:**
- `name` (string): The name of the school
- `address` (string): The physical address of the school
- `latitude` (float): Geographical latitude coordinate of the school
- `longitude` (float): Geographical longitude coordinate of the school

**Response:**
```json
{
  "success": true,
  "message": "School added successfully",
  "school": {
    "id": "12345",
    "name": "Example School",
    "address": "123 Education Street, City, Country",
    "latitude": 37.7749,
    "longitude": -122.4194
  }
}
```

### 2. List Nearby Schools

Retrieve a list of schools sorted by distance from specified coordinates.

```
GET /api/v1/listSchools?latitude={latitudeValue}&longitude={longitudeValue}
```

**Query Parameters:**
- `latitude` (float): Your current latitude coordinate
- `longitude` (float): Your current longitude coordinate

**Response:**
```json
{
  "success": true,
  "schools": [
    {
      "name": "Nearby School 1",
      "address": "456 Learning Avenue, City, Country",
      "distance": 0.5,  // distance in kilometers
      "latitude": 37.7739,
      "longitude": -122.4312
    },
    {
      "name": "Nearby School 2",
      "address": "789 Academic Boulevard, City, Country",
      "distance": 1.2,  // distance in kilometers
      "latitude": 37.7833,
      "longitude": -122.4167
    }
    // More schools...
  ]
}
```

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Sourav-126/School-API.git
   cd School-API
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Configure environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your database configuration and other settings
   ```

4. Start the server
   ```bash
   pnpm run start
   ```

## Development Commands

```bash
# Install dependencies
pnpm install

# Run in development mode with hot-reloading
pnpm run dev

# Run tests
pnpm test

# Build for production
pnpm build

# Run in production mode
pnpm run start

# Lint the code
pnpm lint

# Format the code
pnpm format
```

## Running Locally

To run the application locally:

```bash
# Install dependencies (if not already installed)
pnpm install

# Start the local development server
pnpm run start
```

The API will be available at `http://localhost:3000` (or your configured port).

## Technology Stack

- Node.js
- Express.js
- PSQL (or your database of choice)
- Geospatial indexing for efficient location-based queries
- pnpm as package manager

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Geospatial calculation formulas for accurate distance measurement
- Contributors and maintainers of this project
