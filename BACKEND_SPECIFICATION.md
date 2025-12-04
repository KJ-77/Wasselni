# 🔧 Backend Specification for Frontend Integration

## Overview

This document specifies exactly what the backend needs to provide for the frontend OfferRide feature to work correctly.

---

## 🔌 Endpoint 1: GET /routes

### Purpose
Fetch available route alternatives between two coordinates

### Request
```http
GET /routes?departure=33.8938,35.5018&arrival=34.4347,35.8295
```

### Query Parameters
- `departure` (required): Latitude and longitude separated by comma (format: `lat,lng`)
- `arrival` (required): Latitude and longitude separated by comma (format: `lat,lng`)

### Response Format
Return an **array** of route alternatives from `getDirections()`:

```json
[
  {
    "overview_polyline": "polyline6_encoded_string",
    "distance_meters": 50000,
    "duration_seconds": 3600
  },
  {
    "overview_polyline": "another_polyline6_encoded_string",
    "distance_meters": 52000,
    "duration_seconds": 3700
  }
]
```

### Field Specifications
| Field | Type | Description |
|-------|------|-------------|
| `overview_polyline` | string | Mapbox polyline6 encoded geometry |
| `distance_meters` | number | Distance in meters |
| `duration_seconds` | number | Duration in seconds |

### Example Implementation (Node.js)
```javascript
app.get('/routes', async (req, res) => {
  const { departure, arrival } = req.query;
  
  // Parse coordinates
  const [depLat, depLng] = departure.split(',').map(Number);
  const [arrLat, arrLng] = arrival.split(',').map(Number);
  
  // Call mapbox service
  const alternatives = await mapboxService.getDirections({
    origin: { lat: depLat, lng: depLng },
    destination: { lat: arrLat, lng: arrLng }
  });
  
  // Return array directly
  res.json(alternatives);
});
```

### Frontend Processing
```
Raw Response:
[
  { overview_polyline: "...", distance_meters: 50000, duration_seconds: 3600 }
]
        ↓ (Frontend transforms)
GeoJSON FeatureCollection:
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": 0,
      "geometry": {
        "type": "LineString",
        "coordinates": [[lng, lat], [lng, lat], ...]
      },
      "properties": {
        "distance": 50000,
        "duration": 3600,
        "polyline": "...",
        "routeName": "Route 1"
      }
    }
  ]
}
```

---

## 🔌 Endpoint 2: POST /api/dashboard/profile/rides

### Purpose
Create a new ride offering with route, stops, and ride details

### Request Headers
```http
POST /api/dashboard/profile/rides
Content-Type: application/json
```

### Request Body Schema
```json
{
  "start_location": "string",
  "end_location": "string",
  "departureLat": "number",
  "departureLng": "number",
  "arrivalLat": "number",
  "arrivalLng": "number",
  "polyline": "string",
  "distance": "number",
  "duration": "number",
  "driver_id": "string | number",
  "departure_time": "ISO8601 datetime",
  "arrival_time": "ISO8601 datetime",
  "total_seats": "number",
  "available_seats": "number",
  "price_type": "per_seat | fixed",
  "max_price": "number",
  "driver_price": "number",
  "is_recurring": "boolean",
  "recurring_days": "string (comma-separated) | null",
  "vehicleUsed": {
    "id": "number | string",
    "make": "string",
    "model": "string",
    "year": "number",
    "color": "string",
    "plate": "string",
    "type": "string",
    "capacity": "number",
    "verified": "boolean"
  },
  "ride_status": "published | draft | archived",
  "preferences": {
    "amenities": ["string"],
    "instantBooking": "boolean",
    "womenOnly": "boolean",
    "verifiedOnly": "boolean",
    "minRating": "number",
    "additionalNotes": "string"
  },
  "stops": [
    {
      "routeId": "number | null",
      "stopLat": "number",
      "stopLng": "number",
      "stopAddress": "string",
      "stopOrder": "number",
      "stopDuration": "number (seconds) | optional"
    }
  ]
}
```

### Full Example Payload
```json
{
  "start_location": "Beirut",
  "end_location": "Tripoli",
  "departureLat": 33.8938,
  "departureLng": 35.5018,
  "arrivalLat": 34.4347,
  "arrivalLng": 35.8295,
  "polyline": "uyzsEi~xaV...",
  "distance": 85000,
  "duration": 4500,
  "driver_id": "user_123",
  "departure_time": "2024-12-10T14:00:00Z",
  "arrival_time": "2024-12-10T15:15:00Z",
  "total_seats": 5,
  "available_seats": 3,
  "price_type": "per_seat",
  "max_price": 5,
  "driver_price": 5,
  "is_recurring": false,
  "recurring_days": null,
  "vehicleUsed": {
    "id": 1,
    "make": "BMW",
    "model": "X3",
    "year": 2020,
    "color": "Black",
    "plate": "ABC 123",
    "type": "suv",
    "capacity": 5,
    "verified": true
  },
  "ride_status": "published",
  "preferences": {
    "amenities": ["ac", "music"],
    "instantBooking": false,
    "womenOnly": false,
    "verifiedOnly": false,
    "minRating": 0,
    "additionalNotes": "Friendly driver, extra space for luggage"
  },
  "stops": [
    {
      "routeId": null,
      "stopLat": 34.2,
      "stopLng": 35.8,
      "stopAddress": "Batroun",
      "stopOrder": 1,
      "stopDuration": 300
    }
  ]
}
```

### Response Format (Success)
```json
{
  "success": true,
  "rideId": 789,
  "routeId": 456,
  "message": "Ride published successfully"
}
```

### Response Format (Error)
```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error details"
}
```

### HTTP Status Codes
- `201` - Ride created successfully
- `400` - Bad request (validation error)
- `401` - Unauthorized (driver_id invalid)
- `500` - Server error

### Backend Processing Steps
```
1. Validate input payload
2. Create route record (INSERT into routes table)
3. Get generated route_id
4. Create stop records (INSERT into stops table with route_id)
5. Create ride record (INSERT into rides table with route_id)
6. Return success response with IDs
```

### Example Implementation (Node.js)
```javascript
app.post('/api/dashboard/profile/rides', async (req, res) => {
  try {
    const payload = req.body;
    
    // Step 1: Create route
    const routeResult = await db.query(
      `INSERT INTO routes (
        start_location, end_location, departureLat, departureLng,
        arrivalLat, arrivalLng, polyline, distance, duration
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.start_location,
        payload.end_location,
        payload.departureLat,
        payload.departureLng,
        payload.arrivalLat,
        payload.arrivalLng,
        payload.polyline,
        payload.distance,
        payload.duration
      ]
    );
    
    const routeId = routeResult.insertId;
    
    // Step 2: Create stops
    if (payload.stops && payload.stops.length > 0) {
      for (const stop of payload.stops) {
        await db.query(
          `INSERT INTO stops (
            route_id, stopLat, stopLng, stopAddress, stopOrder, stopDuration
          ) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            routeId,
            stop.stopLat,
            stop.stopLng,
            stop.stopAddress,
            stop.stopOrder,
            stop.stopDuration || 300
          ]
        );
      }
    }
    
    // Step 3: Create ride
    const rideResult = await db.query(
      `INSERT INTO rides (
        driver_id, route_id, departure_time, arrival_time,
        total_seats, available_seats, price_type, max_price,
        driver_price, is_recurring, recurring_days,
        vehicleUsed, ride_status, preferences
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.driver_id,
        routeId,
        payload.departure_time,
        payload.arrival_time,
        payload.total_seats,
        payload.available_seats,
        payload.price_type,
        payload.max_price,
        payload.driver_price,
        payload.is_recurring,
        payload.recurring_days,
        JSON.stringify(payload.vehicleUsed),
        payload.ride_status,
        JSON.stringify(payload.preferences)
      ]
    );
    
    res.status(201).json({
      success: true,
      rideId: rideResult.insertId,
      routeId: routeId,
      message: "Ride published successfully"
    });
  } catch (error) {
    console.error('Error creating ride:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
```

---

## 📝 Data Relationships

```
Routes Table:
├─ id (PK)
├─ start_location
├─ end_location
├─ departureLat, departureLng
├─ arrivalLat, arrivalLng
├─ polyline (encoded geometry)
├─ distance
└─ duration

Stops Table:
├─ id (PK)
├─ route_id (FK to routes)
├─ stopLat, stopLng
├─ stopAddress
├─ stopOrder
└─ stopDuration

Rides Table:
├─ id (PK)
├─ driver_id (FK to users)
├─ route_id (FK to routes)
├─ departure_time
├─ arrival_time
├─ total_seats
├─ available_seats
├─ price_type
├─ max_price
├─ driver_price
├─ is_recurring
├─ recurring_days
├─ vehicleUsed (JSON)
├─ ride_status
└─ preferences (JSON)
```

---

## 🧪 Test Cases

### Test 1: Valid Routes Request
```bash
GET /routes?departure=33.8938,35.5018&arrival=34.4347,35.8295

Expected: Array with 2-3 route alternatives
```

### Test 2: Valid Ride Creation
```bash
POST /api/dashboard/profile/rides
Body: (see Full Example Payload above)

Expected: { success: true, rideId: X, routeId: Y }
```

### Test 3: Invalid Coordinates
```bash
GET /routes?departure=invalid&arrival=invalid

Expected: 400 Bad Request
```

### Test 4: Missing Required Fields
```bash
POST /api/dashboard/profile/rides
Body: { start_location: "Beirut" }

Expected: 400 Bad Request
```

---

## ⚠️ Important Notes

1. **Polyline6 Format:**
   - Mapbox uses polyline6 (1e6 precision factor)
   - Frontend decodes this to [lng, lat] coordinates
   - Do NOT modify the polyline in the response

2. **Coordinates Order:**
   - Query params: `lat,lng` (as strings)
   - Database: Store separately as lat/lng columns
   - GeoJSON: [lng, lat] (opposite order)

3. **Datetime Format:**
   - Always ISO 8601: `2024-12-10T14:00:00Z`
   - Frontend calculates arrival_time = departure_time + duration (in seconds)

4. **Driver ID:**
   - Frontend currently sends: `"user_id_placeholder"`
   - Backend should validate driver_id exists
   - Frontend will be updated to send authenticated user ID

5. **Stops:**
   - Route can have 0-3 stops
   - Stops are optional but included in payload
   - routeId will be null in request (set by backend)

---

## 🔍 Debugging

Enable logging in backend:
```javascript
console.log('[/routes] Query:', req.query);
console.log('[/routes] Result:', alternatives);

console.log('[POST /rides] Payload:', req.body);
console.log('[POST /rides] Route ID:', routeId);
console.log('[POST /rides] Ride ID:', rideResult.insertId);
```

Frontend logs:
```javascript
[MapService] Fetching routes from { departure, arrival }
[MapService] Raw routes response: data
[MapService] Transformed routes to GeoJSON: geojson
[Wizard] Submitting ride payload: payload
```

---

## ✅ Checklist for Backend Implementation

- [ ] GET `/routes` endpoint implemented
- [ ] Endpoint accepts `departure` and `arrival` query params
- [ ] Endpoint calls `getDirections()` and returns alternatives array
- [ ] Response includes `overview_polyline`, `distance_meters`, `duration_seconds`
- [ ] POST `/api/dashboard/profile/rides` endpoint exists
- [ ] Endpoint validates all required fields
- [ ] Endpoint creates route record first
- [ ] Endpoint creates stops with proper route_id
- [ ] Endpoint creates ride record with route_id
- [ ] Response includes `rideId` and `routeId`
- [ ] Error handling returns proper HTTP status codes
- [ ] Logging enabled for debugging

---

**Backend Integration Specification v1.0**  
**Last Updated:** December 4, 2025  
**Status:** Ready for Implementation
