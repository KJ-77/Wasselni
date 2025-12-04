# 🎯 API Client Quick Reference

## Single Import Line

```typescript
import apiClient from '@/services/ApiClient';
```

## Common Operations

### Directions
```typescript
const routes = await apiClient.getDirections({
  departure_lat: 33.8938,
  departure_lng: 35.5018,
  arrival_lat: 34.4347,
  arrival_lng: 35.8295
});
```

### Autocomplete
```typescript
const suggestions = await apiClient.autocomplete("Beirut");
```

### Users
```typescript
const users = await apiClient.getUsers();
const user = await apiClient.getUserById(1);
const newUser = await apiClient.createUser({ name, email, phone });
```

### Vehicles
```typescript
const vehicles = await apiClient.getVehicles();
const vehicle = await apiClient.getVehicleById(1);
const newVehicle = await apiClient.createVehicle({ driver_id, make, model, year, color, licensePlate, capacity });
```

### Rides
```typescript
const rides = await apiClient.getRides();
const ride = await apiClient.getRideById(1);
const newRide = await apiClient.createRide({
  driver_id, route_id, vehicle_id,
  departure_time, arrival_time,
  total_seats, available_seats,
  price_type, max_price, driver_price,
  is_recurring, ride_status, preferences
});
```

### Routes
```typescript
const routes = await apiClient.getRoutes();
const newRoute = await apiClient.createRoute({
  start_location, end_location,
  departureLat, departureLng, arrivalLat, arrivalLng,
  polyline, distance, duration
});
```

### Stops
```typescript
const stops = await apiClient.getStops();
const newStop = await apiClient.createStop({
  route_id, stopLat, stopLng, stopAddress, stopOrder, stopDuration
});
```

### Drivers
```typescript
const drivers = await apiClient.getDrivers();
const driver = await apiClient.getDriverById(1);
const newDriver = await apiClient.createDriver({ user_id, rating, total_rides, verification_status });
```

## Error Handling Template

```typescript
try {
  const result = await apiClient.METHOD(...);
  // Use result
} catch (error) {
  console.error('API Error:', error);
  toast({
    variant: "destructive",
    title: "Operation Failed",
    description: error instanceof Error ? error.message : "Unknown error"
  });
}
```

## All Endpoints Reference

| Method | Endpoint | Function | Resource |
|--------|----------|----------|----------|
| POST | /directions | getDirections | Directions |
| POST | /geocode | geocode | Geocoding |
| GET | /autocomplete | autocomplete | Autocomplete |
| GET | /users | getUsers | User |
| GET | /users/{id} | getUserById | User |
| POST | /users | createUser | User |
| PUT | /users/{id} | updateUser | User |
| DELETE | /users/{id} | deleteUser | User |
| GET | /vehicles | getVehicles | Vehicle |
| GET | /vehicles/{id} | getVehicleById | Vehicle |
| POST | /vehicles | createVehicle | Vehicle |
| PUT | /vehicles/{id} | updateVehicle | Vehicle |
| DELETE | /vehicles/{id} | deleteVehicle | Vehicle |
| GET | /rides | getRides | Ride |
| GET | /rides/{id} | getRideById | Ride |
| POST | /rides | createRide | Ride |
| PUT | /rides/{id} | updateRide | Ride |
| DELETE | /rides/{id} | deleteRide | Ride |
| GET | /stops | getStops | Stop |
| GET | /stops/{id} | getStopById | Stop |
| POST | /stops | createStop | Stop |
| PUT | /stops/{id} | updateStop | Stop |
| DELETE | /stops/{id} | deleteStop | Stop |
| GET | /routes | getRoutes | Route |
| GET | /routes/{id} | getRouteById | Route |
| POST | /routes | createRoute | Route |
| PUT | /routes/{id} | updateRoute | Route |
| DELETE | /routes/{id} | deleteRoute | Route |
| GET | /drivers | getDrivers | Driver |
| GET | /drivers/{id} | getDriverById | Driver |
| POST | /drivers | createDriver | Driver |
| PUT | /drivers/{id} | updateDriver | Driver |
| DELETE | /drivers/{id} | deleteDriver | Driver |

## Debugging

Open browser console and look for:
- `[ApiClient]` - API calls and responses
- `[MapService]` - Map-related operations
- `[Wizard]` - Form submission

All API calls visible in DevTools Network tab (filter: `execute-api.me-central-1`)

## Files

- **Service:** `src/services/ApiClient.ts`
- **Integration:** `src/services/MapService.ts`, `src/components/offerRides/wizard/wizard.tsx`
- **Docs:** `API_CLIENT_INTEGRATION.md`, `API_CLIENT_COMPLETE.md`

---

**API Client v1.0** | 28 endpoints | Full TypeScript support | Production ready
