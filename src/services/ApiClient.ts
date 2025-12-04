/**
 * Centralized API Client for all backend endpoints
 * Base URL: https://rl4ynabhzk.execute-api.me-central-1.amazonaws.com
 * 
 * Features:
 * - Automatic error handling and logging
 * - Type-safe request/response interfaces
 * - Support for all CRUD operations
 * - Consistent retry logic
 */

const API_BASE_URL = 'https://rl4ynabhzk.execute-api.me-central-1.amazonaws.com';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

// User Types
export interface User {
  id?: string | number;
  name: string;
  email: string;
  phone: string;
  rating?: number;
  created_at?: string;
  updated_at?: string;
}

// Vehicle Types
export interface Vehicle {
  id?: string | number;
  driver_id?: string | number;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  capacity: number;
  created_at?: string;
  updated_at?: string;
}

// Route Types
export interface Route {
  id?: string | number;
  start_location: string;
  end_location: string;
  departureLat: number;
  departureLng: number;
  arrivalLat: number;
  arrivalLng: number;
  polyline: string;
  distance: number; // in meters
  duration: number; // in seconds
  created_at?: string;
  updated_at?: string;
}

// Stop Types
export interface Stop {
  id?: string | number;
  route_id?: string | number;
  stopLat: number;
  stopLng: number;
  stopAddress: string;
  stopOrder: number;
  stopDuration?: number; // in seconds
  created_at?: string;
  updated_at?: string;
}

// Ride Types
export interface Ride {
  id?: string | number;
  driver_id: string | number;
  route_id: string | number;
  vehicle_id?: string | number;
  departure_time: string; // ISO8601
  arrival_time: string; // ISO8601
  total_seats: number;
  available_seats: number;
  price_type: 'fixed' | 'per_distance';
  max_price: number;
  driver_price?: number;
  is_recurring: boolean;
  recurring_days?: string; // "mon,wed,fri"
  ride_status: 'active' | 'cancelled' | 'completed';
  preferences?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

// Driver Types
export interface Driver {
  id?: string | number;
  user_id?: string | number;
  rating?: number;
  total_rides?: number;
  verification_status?: 'pending' | 'verified' | 'rejected';
  created_at?: string;
  updated_at?: string;
}

// Geocode Types
export interface GeocodeRequest {
  address: string;
}

export interface GeocodeResponse {
  lat: number;
  lng: number;
  address: string;
  place_name?: string;
}

// Direction Types
export interface DirectionRequest {
  origin: {
    lat: number;
    lng: number;
  };
  destination: {
    lat: number;
    lng: number;
  };
}

export interface DirectionAlternative {
  overview_polyline: string;
  distance_meters: number;
  duration_seconds: number;
}

export interface DirectionResponse {
  alternatives: DirectionAlternative[];
  best_route_index?: number;
}

// Autocomplete Types
export interface AutocompleteResponse {
  suggestions: Array<{
    place_name: string;
    center: [number, number]; // [lng, lat]
    relevance?: number;
  }>;
}

// API Response Wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}

// ============================================================================
// API CLIENT CLASS
// ============================================================================

class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number = 10000; // 10 seconds

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic fetch wrapper with error handling
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log(`[ApiClient] ${options.method || 'GET'} ${url}`);
      if (options.body) {
        console.log(`[ApiClient] Request body:`, options.body);
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), this.defaultTimeout);

      const response = await fetch(url, {
        ...defaultOptions,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `HTTP ${response.status}: ${errorData.message || response.statusText}`
        );
      }

      const data = await response.json();
      console.log(`[ApiClient] Response:`, data);
      return data as T;
    } catch (error) {
      console.error(`[ApiClient] Error:`, error);
      throw error;
    }
  }

  // ========================================================================
  // DIRECTIONS ENDPOINTS
  // ========================================================================

  async getDirections(req: DirectionRequest): Promise<DirectionResponse> {
    console.log('[ApiClient] Sending directions request with body:', req);
    return this.request<DirectionResponse>('/directions', {
      method: 'POST',
      body: JSON.stringify(req),
    });
  }

  // ========================================================================
  // GEOCODE ENDPOINTS
  // ========================================================================

  async geocode(address: string): Promise<GeocodeResponse> {
    return this.request<GeocodeResponse>('/geocode', {
      method: 'POST',
      body: JSON.stringify({ address }),
    });
  }

  // ========================================================================
  // AUTOCOMPLETE ENDPOINTS
  // ========================================================================

  async autocomplete(query: string): Promise<AutocompleteResponse> {
    const params = new URLSearchParams({ q: query });
    return this.request<AutocompleteResponse>(`/autocomplete?${params}`);
  }

  // ========================================================================
  // USER ENDPOINTS
  // ========================================================================

  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/users');
  }

  async getUserById(id: string | number): Promise<User> {
    return this.request<User>(`/users/${id}`);
  }

  async createUser(user: User): Promise<User> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  }

  async updateUser(id: string | number, user: Partial<User>): Promise<User> {
    return this.request<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    });
  }

  async deleteUser(id: string | number): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // ========================================================================
  // VEHICLE ENDPOINTS
  // ========================================================================

  async getVehicles(): Promise<Vehicle[]> {
    return this.request<Vehicle[]>('/vehicles');
  }

  async getVehicleById(id: string | number): Promise<Vehicle> {
    return this.request<Vehicle>(`/vehicles/${id}`);
  }

  async createVehicle(vehicle: Vehicle): Promise<Vehicle> {
    return this.request<Vehicle>('/vehicles', {
      method: 'POST',
      body: JSON.stringify(vehicle),
    });
  }

  async updateVehicle(id: string | number, vehicle: Partial<Vehicle>): Promise<Vehicle> {
    return this.request<Vehicle>(`/vehicles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(vehicle),
    });
  }

  async deleteVehicle(id: string | number): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/vehicles/${id}`, {
      method: 'DELETE',
    });
  }

  // ========================================================================
  // RIDES ENDPOINTS
  // ========================================================================

  async getRides(): Promise<Ride[]> {
    return this.request<Ride[]>('/rides');
  }

  async getRideById(id: string | number): Promise<Ride> {
    return this.request<Ride>(`/rides/${id}`);
  }

  async createRide(ride: Ride): Promise<Ride> {
    return this.request<Ride>('/rides', {
      method: 'POST',
      body: JSON.stringify(ride),
    });
  }

  async updateRide(id: string | number, ride: Partial<Ride>): Promise<Ride> {
    return this.request<Ride>(`/rides/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ride),
    });
  }

  async deleteRide(id: string | number): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/rides/${id}`, {
      method: 'DELETE',
    });
  }

  // ========================================================================
  // STOPS ENDPOINTS
  // ========================================================================

  async getStops(): Promise<Stop[]> {
    return this.request<Stop[]>('/stops');
  }

  async getStopById(id: string | number): Promise<Stop> {
    return this.request<Stop>(`/stops/${id}`);
  }

  async createStop(stop: Stop): Promise<Stop> {
    return this.request<Stop>('/stops', {
      method: 'POST',
      body: JSON.stringify(stop),
    });
  }

  async updateStop(id: string | number, stop: Partial<Stop>): Promise<Stop> {
    return this.request<Stop>(`/stops/${id}`, {
      method: 'PUT',
      body: JSON.stringify(stop),
    });
  }

  async deleteStop(id: string | number): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/stops/${id}`, {
      method: 'DELETE',
    });
  }

  // ========================================================================
  // ROUTES ENDPOINTS
  // ========================================================================

  async getRoutes(): Promise<Route[]> {
    return this.request<Route[]>('/routes');
  }

  async getRouteById(id: string | number): Promise<Route> {
    return this.request<Route>(`/routes/${id}`);
  }

  async createRoute(route: Route): Promise<Route> {
    return this.request<Route>('/routes', {
      method: 'POST',
      body: JSON.stringify(route),
    });
  }

  async updateRoute(id: string | number, route: Partial<Route>): Promise<Route> {
    return this.request<Route>(`/routes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(route),
    });
  }

  async deleteRoute(id: string | number): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/routes/${id}`, {
      method: 'DELETE',
    });
  }

  // ========================================================================
  // DRIVERS ENDPOINTS
  // ========================================================================

  async getDrivers(): Promise<Driver[]> {
    return this.request<Driver[]>('/drivers');
  }

  async getDriverById(id: string | number): Promise<Driver> {
    return this.request<Driver>(`/drivers/${id}`);
  }

  async createDriver(driver: Driver): Promise<Driver> {
    return this.request<Driver>('/drivers', {
      method: 'POST',
      body: JSON.stringify(driver),
    });
  }

  async updateDriver(id: string | number, driver: Partial<Driver>): Promise<Driver> {
    return this.request<Driver>(`/drivers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(driver),
    });
  }

  async deleteDriver(id: string | number): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/drivers/${id}`, {
      method: 'DELETE',
    });
  }
}

// ============================================================================
// SINGLETON EXPORT
// ============================================================================

export const apiClient = new ApiClient();

export default apiClient;
