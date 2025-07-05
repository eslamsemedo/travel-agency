# Travel Agency API Setup Guide

This guide explains how to set up and use the MongoDB-backed API for the travel agency application.

## Prerequisites

- Node.js and npm installed
- MongoDB instance (local or cloud)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file in the root directory with:
```
MONGODB_URI=mongodb://localhost:27017/travel-agency
```

For MongoDB Atlas, use:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travel-agency
```

## API Endpoints

### Hotels
- `GET /api/hotels` - Get all hotels
- `POST /api/hotels` - Create a new hotel
- `GET /api/hotels/[id]` - Get a specific hotel
- `PUT /api/hotels/[id]` - Update a hotel
- `DELETE /api/hotels/[id]` - Delete a hotel

### Sea Trips
- `GET /api/seaTrips` - Get all sea trips
- `POST /api/seaTrips` - Create a new sea trip
- `GET /api/seaTrips/[id]` - Get a specific sea trip
- `PUT /api/seaTrips/[id]` - Update a sea trip
- `DELETE /api/seaTrips/[id]` - Delete a sea trip

### Safari Trips
- `GET /api/safariTrips` - Get all safari trips
- `POST /api/safariTrips` - Create a new safari trip
- `GET /api/safariTrips/[id]` - Get a specific safari trip
- `PUT /api/safariTrips/[id]` - Update a safari trip
- `DELETE /api/safariTrips/[id]` - Delete a safari trip

## Data Models

### Hotel
```typescript
{
  name: string;
  description: string;
  city: string;
  location: string;
  image: string;
  video?: string;
}
```

### Sea Trip
```typescript
{
  name: string;
  description: string;
  price: string;
  discount?: string;
  start_time: string;
  end_time: string;
  transportation: string;
  total_price: string;
  image: string;
  video?: string;
}
```

### Safari Trip
```typescript
{
  name: string;
  description: string;
  price: string;
  image: string;
  start_time: string;
  end_time: string;
  transportation: string;
  video?: string;
  total_price: string;
}
```

## Usage Examples

### Create a Hotel
```bash
curl -X POST http://localhost:3000/api/hotels \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Luxury Resort",
    "description": "A beautiful 5-star resort",
    "city": "Cairo",
    "location": "Nile Corniche",
    "image": "https://example.com/hotel.jpg",
    "video": "https://example.com/hotel-video.mp4"
  }'
```

### Get All Hotels
```bash
curl http://localhost:3000/api/hotels
```

### Update a Hotel
```bash
curl -X PUT http://localhost:3000/api/hotels/[id] \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Hotel Name",
    "description": "Updated description",
    "city": "Alexandria",
    "location": "New location",
    "image": "https://example.com/updated-hotel.jpg"
  }'
```

## Error Handling

All endpoints return consistent JSON responses:

### Success Response
```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Development

Run the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000/api/` 