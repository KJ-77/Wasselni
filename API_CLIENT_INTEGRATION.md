# API Client Integration Guide

## Overview

The new `ApiClient` service (`src/services/ApiClient.ts`) provides a centralized, type-safe interface to all backend endpoints. This document explains how to use it and how it's integrated throughout the application.

## API Base URL

```
https://rl4ynabhzk.execute-api.me-central-1.amazonaws.com
```

## Installation & Usage

### Importing the Client

```typescript
import apiClient from '@/services/ApiClient';
// or import specific types
import { apiClient, type User, type Vehicle, type Ride } from '@/services/ApiClient';
```

### Basic Usage Pattern

```typescript
// Import
import apiClient from '@/services/ApiClient';

// Use in components
try {
  // Fetch all users
  const users = await apiClient.getUsers();
  
  // Fetch single user
  const user = await apiClient.getUserById(123);
  
  // Create user
  const newUser = await apiClient.createUser({
    name: "John Doe",
    email: "john@example.com",
    phone: "+961123456789"
  });
  
  // Update user
  const updated = await apiClient.updateUser(123, { name: "Jane Doe" });
  
  // Delete user
  await apiClient.deleteUser(123);
} catch (error) {
  console.error('API Error:', error);
}
```

## Endpoint Categories

### 1. Directions & Geocoding

```typescript
// Get route alternatives between two points
const directions = await apiClient.getDirections({
  departure_lat: 33.8938,
  departure_lng: 35.5018,
  arrival_lat: 34.4347,
  arrival_lng: 35.8295
});
// Returns: { alternatives: [{ overview_polyline, distance_meters, duration_seconds }] }

// Geocode an address to coordinates
const geocoded = await apiClient.geocode("Beirut, Lebanon");
// Returns: { lat, lng, address, place_name }

// Get autocomplete suggestions
const suggestions = await apiClient.autocomplete("Beirut");
// Returns: { suggestions: [{ place_name, center: [lng, lat], relevance }] }
```

### 2. Users

```typescript
// List all users
const allUsers = await apiClient.getUsers();

// Get specific user
const user = await apiClient.getUserById(1);

// Create new user
const newUser = await apiClient.createUser({
  name: "Alice",
  email: "alice@example.com",
  phone: "+961234567890"
});

// Update user
const updated = await apiClient.updateUser(1, { phone: "+961234567891" });

// Delete user
await apiClient.deleteUser(1);
```

### 3. Vehicles

```typescript
// List all vehicles
const vehicles = await apiClient.getVehicles();

// Get specific vehicle
const vehicle = await apiClient.getVehicleById(1);

// Create vehicle
const newVehicle = await apiClient.createVehicle({
  driver_id: 1,
  make: "BMW",
  model: "X3",
  year: 2020,
  color: "Black",
  licensePlate: "ABC123",
  capacity: 5
});

// Update vehicle
const updated = await apiClient.updateVehicle(1, { color: "White" });

// Delete vehicle
await apiClient.deleteVehicle(1);
```

### 4. Rides

```typescript
// List all rides
const rides = await apiClient.getRides();

// Get specific ride
const ride = await apiClient.getRideById(1);

// Create ride (from wizard submission)
const newRide = await apiClient.createRide({
  driver_id: 1,
  route_id: 100,
  vehicle_id: 1,
  departure_time: "2024-12-10T14:00:00Z",
  arrival_time: "2024-12-10T15:15:00Z",
  total_seats: 5,
  available_seats: 3,
  price_type: "per_seat",
  max_price: 5,
  driver_price: 5,
  is_recurring: false,
  ride_status: "published",
  preferences: { amenities: ["wifi", "charger"], instantBooking: true }
});

// Update ride
const updated = await apiClient.updateRide(1, { available_seats: 2 });

// Delete ride
await apiClient.deleteRide(1);
```

### 5. Stops

```typescript
// List all stops
const stops = await apiClient.getStops();

// Get specific stop
const stop = await apiClient.getStopById(1);

// Create stop
const newStop = await apiClient.createStop({
  route_id: 100,
  stopLat: 33.95,
  stopLng: 35.55,
  stopAddress: "Batroun",
  stopOrder: 1,
  stopDuration: 300
});

// Update stop
const updated = await apiClient.updateStop(1, { stopDuration: 600 });

// Delete stop
await apiClient.deleteStop(1);
```

### 6. Routes

```typescript
// List all routes (database routes, not directions)
const routes = await apiClient.getRoutes();

// Get specific route
const route = await apiClient.getRouteById(100);

// Create route
const newRoute = await apiClient.createRoute({
  start_location: "Beirut",
  end_location: "Tripoli",
  departureLat: 33.8938,
  departureLng: 35.5018,
  arrivalLat: 34.4347,
  arrivalLng: 35.8295,
  polyline: "encoded_polyline_string",
  distance: 85000,
  duration: 4500
});

// Update route
const updated = await apiClient.updateRoute(100, { distance: 86000 });

// Delete route
await apiClient.deleteRoute(100);
```

### 7. Drivers

```typescript
// List all drivers
const drivers = await apiClient.getDrivers();

// Get specific driver
const driver = await apiClient.getDriverById(1);

// Create driver profile
const newDriver = await apiClient.createDriver({
  user_id: 1,
  rating: 4.5,
  total_rides: 10,
  verification_status: "pending"
});

// Update driver
const updated = await apiClient.updateDriver(1, { verification_status: "verified" });

// Delete driver
await apiClient.deleteDriver(1);
```

## Integration Points in Application

### 1. Wizard Component (`src/components/offerRides/wizard/wizard.tsx`)

```typescript
import apiClient from '@/services/ApiClient';

// In submit function:
const submit = async () => {
  try {
    const payload = transformToFlatPayload(data, driverId, selectedVehicle);
    
    // Use apiClient to submit ride
    await apiClient.createRide(payload as any);
    
    toast({ title: "Ride Published!" });
    navigate("/rides");
  } catch (err) {
    toast({ variant: "destructive", title: "Failed", description: err.message });
  }
};
```

### 2. Map Service (`src/services/MapService.ts`)

```typescript
import apiClient from './ApiClient';

// Directions are fetched through apiClient
export const fetchDirections = async (params: FetchDirectionsParams) => {
  const directionResponse = await apiClient.getDirections({
    departure_lat: params.origin.lat,
    departure_lng: params.origin.lng,
    arrival_lat: params.destination.lat,
    arrival_lng: params.destination.lng,
  });
  return directionResponse;
};

// Autocomplete suggestions
export const fetchAutocompleteSuggestions = async (query: string) => {
  const response = await apiClient.autocomplete(query);
  return response.suggestions.map(s => ({
    place_id: s.place_name,
    address: s.place_name,
    lat: s.center[1],
    lng: s.center[0],
  }));
};
```

## Type Definitions

All request and response types are exported from the ApiClient:

```typescript
import {
  // User Types
  type User,
  
  // Vehicle Types
  type Vehicle,
  
  // Ride Types
  type Ride,
  
  // Route Types
  type Route,
  type Stop,
  
  // Direction Types
  type DirectionRequest,
  type DirectionResponse,
  type DirectionAlternative,
  
  // Geocode Types
  type GeocodeRequest,
  type GeocodeResponse,
  
  // Autocomplete Types
  type AutocompleteResponse,
  
  // Driver Types
  type Driver,
  
  // API Response Wrapper
  type ApiResponse,
} from '@/services/ApiClient';
```

## Error Handling

The ApiClient includes automatic error handling and logging:

```typescript
try {
  const result = await apiClient.getUsers();
} catch (error) {
  // Errors are logged with [ApiClient] prefix
  // Network timeouts: 10 second default
  // HTTP errors: Parsed from response body
  // Type errors: TypeScript catches at compile time
  console.error('API call failed:', error);
}
```

### Error Response Format

When an API call fails, the error includes:
- `HTTP {status_code}`: The HTTP status code
- Message from backend error response
- Console logging with `[ApiClient]` prefix for debugging

### Retry Logic

Autocomplete and some map services include automatic retry logic:
- Up to 2 attempts for transient failures
- 250ms backoff between retries
- Only retries on server errors (5xx), not client errors (4xx)

## Configuration

### Timeout

Default timeout is 10 seconds. To modify:

```typescript
const apiClient = new ApiClient();
apiClient['defaultTimeout'] = 30000; // 30 seconds
```

### Base URL

Default base URL is the AWS Lambda endpoint. To use a different backend:

```typescript
import { ApiClient } from '@/services/ApiClient';

const customClient = new ApiClient('https://custom-api.example.com');
```

## Complete Ride Publishing Flow

Here's how all the pieces work together in the OfferRide wizard:

1. **Route Selection** (Step 1)
   ```
   User enters cities → MapService.fetchAutocompleteSuggestions()
                      → apiClient.autocomplete()
                      
   User selects cities → MapService.fetchAvailableRoutes()
                      → apiClient.getDirections()
                      → Polyline6 decoding → GeoJSON rendering
                      
   User clicks route → Route stored in WizardData
   ```

2. **Form Completion** (Steps 2-4)
   ```
   User selects vehicle, price, preferences
   ```

3. **Submission** (Step 4)
   ```
   Form validation
   ↓
   transformToFlatPayload(data) → Backend schema
   ↓
   apiClient.createRide(payload)
   ↓
   Backend creates route, stops, ride
   ↓
   Success toast & navigation
   ```

## Testing the Integration

### Test Individual Endpoints

```typescript
// In browser console or test file:
import apiClient from '@/services/ApiClient';

// Test directions
await apiClient.getDirections({
  departure_lat: 33.8938,
  departure_lng: 35.5018,
  arrival_lat: 34.4347,
  arrival_lng: 35.8295
});

// Test autocomplete
await apiClient.autocomplete("Beirut");

// Test creating a ride
await apiClient.createRide({
  driver_id: 1,
  route_id: 100,
  departure_time: "2024-12-10T14:00:00Z",
  arrival_time: "2024-12-10T15:15:00Z",
  total_seats: 5,
  available_seats: 3,
  price_type: "per_seat",
  max_price: 5,
  is_recurring: false,
  ride_status: "published",
});
```

### Check Network Logs

In browser DevTools Network tab:
- All requests go to: `https://rl4ynabhzk.execute-api.me-central-1.amazonaws.com/`
- Watch for `[ApiClient]` console logs showing request/response
- Check response payload in Network tab for backend structure validation

## Best Practices

1. **Always use ApiClient** for API calls, not raw fetch()
2. **Handle errors properly** with try/catch blocks
3. **Log using console** - ApiClient adds [ApiClient] prefix automatically
4. **Type your data** - Use exported types for better IDE support
5. **Test endpoints** - Verify each endpoint works before integration
6. **Check Network tab** - Validate actual API calls and payloads

## Migration from Raw Fetch

### Before (Old Way)
```typescript
const res = await fetch('/api/users', { method: 'GET' });
const users = await res.json();
```

### After (New Way)
```typescript
import apiClient from '@/services/ApiClient';
const users = await apiClient.getUsers();
```

Benefits:
- ✅ Type safety
- ✅ Automatic error handling & logging
- ✅ Consistent API across app
- ✅ Easier testing & debugging
- ✅ Centralized error handling

---

**API Client v1.0**  
**Last Updated:** December 4, 2025
