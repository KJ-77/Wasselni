# 📊 OfferRide Architecture Diagrams

## Component Hierarchy

```
WizardContainer
├── Stepper (Progress indicator)
│
├── Step1: RouteDetails ⭐
│   ├── AddressAutocomplete (Departure)
│   ├── AddressAutocomplete (Specific Location)
│   ├── AddressAutocomplete (Arrival)
│   ├── AddressAutocomplete (Specific Location)
│   ├── Input (Departure Date)
│   ├── Input (Departure Time)
│   ├── Checkbox (Round Trip)
│   ├── [Conditional] Input (Return Date)
│   ├── [Conditional] Input (Return Time)
│   ├── Stops Manager
│   │   └── [1-3] AddressAutocomplete (Stop locations)
│   └── MapboxMap ⭐ (Route Selection)
│       ├── MultiLayer Routes Visualization
│       ├── Click Handler
│       └── Visual Feedback
│
├── Step2: VehicleAndPricing
│   ├── VehicleSelector
│   ├── Input (Available Seats)
│   └── Input (Price Per Seat)
│
├── Step3: Preferences
│   ├── Checkbox (Amenities)
│   ├── Checkbox (Instant Booking)
│   ├── Checkbox (Women Only)
│   ├── Checkbox (Verified Only)
│   ├── Input (Min Rating)
│   └── Input (Notes)
│
├── Step4: ReviewAndPublish
│   ├── Preview Card (Route Summary with Distance/Duration)
│   ├── Publishing Options
│   └── Terms Agreement
│
└── Navigation Buttons
    ├── Back
    ├── Next
    └── Publish
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                   STEP 1: ROUTE ENTRY                   │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
         ┌─────────────────────────────────────┐
         │  User Selects Departure City       │
         │         (Autocomplete)              │
         └─────────────────────────────────────┘
                           │
                           ▼
         ┌─────────────────────────────────────┐
         │  City → Coordinates Extracted       │
         │  departureLat, departureLng Stored  │
         └─────────────────────────────────────┘
                           │
                           ▼
         ┌─────────────────────────────────────┐
         │  User Selects Arrival City          │
         │        (Same Process)               │
         └─────────────────────────────────────┘
                           │
                           ▼
    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃  Both Coordinates Available?         ┃
    ┃  if (departure && arrival)           ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                    YES │ NO
                        │
        ┌───────────────┴────────────────┐
        │ YES                        NO  │
        ▼                                ▼
    ┌─────────────────────┐    [Waiting for both]
    │ FETCH ROUTES        │    
    │ GET /routes?...     │    
    └─────────────────────┘    
        │
        ▼
    ┌─────────────────────────────────────┐
    │  Backend Returns:                   │
    │  [{                                 │
    │    overview_polyline: "...",        │
    │    distance_meters: 50000,          │
    │    duration_seconds: 3600           │
    │  }, ...]                            │
    └─────────────────────────────────────┘
        │
        ▼
    ┌─────────────────────────────────────┐
    │  MapService.transformRoutesToGeoJSON│
    │  ├─ decodePolyline6() ✓            │
    │  ├─ Create Features ✓              │
    │  └─ Return FeatureCollection ✓     │
    └─────────────────────────────────────┘
        │
        ▼
    ┌─────────────────────────────────────┐
    │  MapboxMap Component               │
    │  ├─ Source: "routes"               │
    │  ├─ Layer: "routes" (blue)         │
    │  ├─ Layer: "routes-selected"       │
    │  └─ Click Handler Added            │
    └─────────────────────────────────────┘
        │
        ▼
    ┌─────────────────────────────────────┐
    │  Routes Displayed on Map            │
    │  (Blue LineStrings)                 │
    │  Alert: "Click to select route"     │
    └─────────────────────────────────────┘
        │
        ▼
    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃  User Clicks Route?                  ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
        YES │ NO
            │
    ┌───────┴────────────┐
    │ YES            NO  │
    ▼                    ▼
┌─────────────────┐  [Still waiting]
│ handleRouteSelect
│ ├─ Extract feature
│ ├─ Create SelectedRoute
│ └─ setData({...})
└─────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  WizardData.routeDetails            │
│  ├─ selectedRoute: SelectedRoute    │
│  ├─ distance ✓                      │
│  ├─ duration ✓                      │
│  └─ geometry ✓                      │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  Map Updates                        │
│  ├─ Selected route → Green          │
│  ├─ Other routes → Blue             │
│  └─ Highlight applied               │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  User Feedback                      │
│  ├─ Alert: "Route Selected ✓"      │
│  ├─ Distance: "50 km"              │
│  ├─ Duration: "1h 5m"              │
│  └─ Next Button: ENABLED           │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│         STEP 2: VEHICLE             │
│     (Route data persists)           │
└─────────────────────────────────────┘
```

---

## Data Transformation Pipeline

```
┌────────────────────────────────────────────────────────────────┐
│                    FRONTEND (STEP 1-4)                         │
├────────────────────────────────────────────────────────────────┤
│ WizardData {                                                   │
│   routeDetails: {                                              │
│     departureCity: "Beirut"                                    │
│     departureCoordinates: { lat: 33.8938, lng: 35.5018 }     │
│     arrivalCity: "Tripoli"                                     │
│     arrivalCoordinates: { lat: 34.4347, lng: 35.8295 }       │
│     departureDate: "2024-12-10"                                │
│     departureTime: "14:00"                                     │
│     selectedRoute: {                                           │
│       geometry: { type: "LineString", coordinates: [...] }   │
│       distance: 85000                                          │
│       duration: 4500                                           │
│       polyline: "..."                                          │
│     }                                                          │
│     stops: [...]                                               │
│   }                                                            │
│   vehicleAndPricing: {                                         │
│     selectedVehicleId: 1                                       │
│     availableSeats: 3                                          │
│     pricePerSeat: 5                                            │
│   }                                                            │
│   preferences: { amenities: [...], ... }                      │
│   publishing: { agreeTerms: true, ... }                       │
│ }                                                              │
└────────────────────────────────────────────────────────────────┘
        │
        ▼ transformToFlatPayload(data, driverId, vehicle)
        │
┌────────────────────────────────────────────────────────────────┐
│                BACKEND PAYLOAD                                 │
├────────────────────────────────────────────────────────────────┤
│ {                                                              │
│   // Route fields                                              │
│   start_location: "Beirut"                                     │
│   end_location: "Tripoli"                                      │
│   departureLat: 33.8938                                        │
│   departureLng: 35.5018                                        │
│   arrivalLat: 34.4347                                          │
│   arrivalLng: 35.8295                                          │
│   polyline: "..."                                              │
│   distance: 85000                                              │
│   duration: 4500                                               │
│                                                                │
│   // Ride fields                                               │
│   driver_id: "user_123"                                        │
│   departure_time: "2024-12-10T14:00:00Z"                      │
│   arrival_time: "2024-12-10T15:15:00Z"  ← calculated          │
│   total_seats: 5                                               │
│   available_seats: 3                                           │
│   price_type: "per_seat"                                       │
│   max_price: 5                                                 │
│   driver_price: 5                                              │
│   is_recurring: false                                          │
│   vehicleUsed: { id: 1, make: "BMW", ... }                    │
│   ride_status: "published"                                     │
│   preferences: { amenities: [...], ... }                      │
│                                                                │
│   // Stops                                                     │
│   stops: [                                                     │
│     {                                                          │
│       routeId: null,  ← Set by backend                         │
│       stopLat: 34.2                                            │
│       stopLng: 35.8                                            │
│       stopAddress: "Batroun"                                   │
│       stopOrder: 1                                             │
│       stopDuration: 300                                        │
│     }                                                          │
│   ]                                                            │
│ }                                                              │
└────────────────────────────────────────────────────────────────┘
        │
        ▼ POST /api/dashboard/profile/rides
        │
┌────────────────────────────────────────────────────────────────┐
│                  BACKEND DATABASE                              │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Routes Table:                                                 │
│  ├─ INSERT route                                               │
│  └─ Get route_id (456)                                         │
│                                                                │
│  Stops Table:                                                  │
│  └─ INSERT stops with route_id = 456                          │
│                                                                │
│  Rides Table:                                                  │
│  └─ INSERT ride with route_id = 456                           │
│     Returns ride_id (789)                                      │
│                                                                │
│  Response:                                                     │
│  {                                                             │
│    success: true,                                              │
│    rideId: 789,                                                │
│    routeId: 456                                                │
│  }                                                             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## State Management Flow

```
┌─────────────────────────────────────────────┐
│         Wizard Component State              │
├─────────────────────────────────────────────┤
│ const [data, setData] = useState(           │
│   WizardData {                              │
│     routeDetails: {...}                     │
│     vehicleAndPricing: {...}                │
│     preferences: {...}                      │
│     publishing: {...}                       │
│   }                                         │
│ )                                           │
└─────────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
    Step1        Step2        Step3
    │             │             │
    ├─[onChange]→ setData()    │
    │             ├─[onChange]→ setData()
    │             │             ├─[onChange]→ setData()
    │             │             │
    └─────────────┴─────────────┘
            │
            ▼ [Submit]
        transform
            │
            ▼
        POST
            │
            ▼
        Success/Error
```

---

## Map Rendering Layers

```
Mapbox GL JS Container
├── Vector Tile Basemap (Streets style)
│
├── Source: "routes" (GeoJSON FeatureCollection)
│   ├── Feature 0: Route 1 geometry
│   ├── Feature 1: Route 2 geometry
│   └── Feature N: Route N geometry
│
├── Layer: "routes" (unselected)
│   ├── type: "line"
│   ├── paint: { line-color: "#007cbf", line-width: 3, line-opacity: 0.6 }
│   └── filter: ["!=", "isSelected", true]
│
├── Layer: "routes-selected" (selected)
│   ├── type: "line"
│   ├── paint: { line-color: "#059669", line-width: 5, line-opacity: 1 }
│   └── filter: ["==", "isSelected", true]
│
└── Event Listeners:
    ├── click + "routes" → onRouteSelect()
    ├── mouseenter → cursor: pointer
    └── mouseleave → cursor: default
```

---

## Polyline6 Decoding Process

```
Input:  "uyzsEi~xaVqBqCdF~@...polyline6_string"

Process:
  1. Split into 5-bit chunks encoded with -63 offset
  2. Calculate delta-encoded coordinates
  3. Apply precision factor (1e6 for polyline6)
  4. Convert to [lng, lat] pairs

Output: [
  [35.5018, 33.8938],    // Start point
  [35.5019, 33.8939],
  [35.5025, 33.8945],
  ...
  [35.3231, 33.7331]     // End point
]

Formula: coordinate = (charCode - 63) bits, accumulated with XOR
Result: [lng, lat] ready for GeoJSON
```

---

## Error Handling Flow

```
┌─────────────────────────────────┐
│   Fetch Routes Request          │
└─────────────────────────────────┘
        │
    ┌───┴───┐
    │       │
   YES     NO
    │       └──→ Console Error
    │           Return null
    │           No routes displayed
    │
    ▼
 Success?
    │
    ├─YES─→ Transform
    │       Return GeoJSON
    │       Display on map
    │
    └─NO──→ HTTP Error
            Status check fails
            Log error with status
            Return null
            Show error to user
```

---

## Type System

```typescript
// Frontend Types
WizardData {
  routeDetails: RouteDetails {
    departureCity: string
    departureCoordinates?: { lat, lng }
    arrivalCity: string
    arrivalCoordinates?: { lat, lng }
    selectedRoute?: SelectedRoute {
      geometry: { type: "LineString", coordinates }
      distance?: number
      duration?: number
      polyline?: string
      properties?: Record<string, any>
    }
    stops: Stop[]
  }
  vehicleAndPricing: VehicleAndPricing
  preferences: RidePreferences
  publishing: PublishingOptions
}

// Backend Types
BackendRoute {
  start_location: string
  end_location: string
  departureLat: number
  departureLng: number
  arrivalLat: number
  arrivalLng: number
  polyline: string
  distance: number
  duration: number
}

BackendRide {
  driver_id: string | number
  route_id: number
  departure_time: string (ISO8601)
  arrival_time: string (ISO8601)
  total_seats: number
  available_seats: number
  price_type: "per_seat" | "fixed"
  max_price: number
  driver_price: number
  is_recurring: boolean
  recurring_days?: string
  vehicleUsed: Vehicle
  ride_status: "published" | "draft" | "archived"
  preferences: RidePreferences
}
```

---

**Architecture Diagrams v1.0**  
**Last Updated:** December 4, 2025
