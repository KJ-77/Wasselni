// src/services/MapService.ts

import apiClient from './ApiClient';

/**
 * Decode polyline6 encoded string to [lng, lat] coordinates
 * Polyline6 uses a precision factor of 1e6 instead of 1e5
 * Reference: https://github.com/mapbox/polyline/blob/master/src/polyline.js
 */
function decodePolyline6(encoded: string): [number, number][] {
  const precision = 1e6;
  const coordinates: [number, number][] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let result = 0;
    let shift = 0;
    let byte: number;

    // Decode latitude
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const latDelta = result & 1 ? ~(result >> 1) : result >> 1;
    lat += latDelta;

    result = 0;
    shift = 0;

    // Decode longitude
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const lngDelta = result & 1 ? ~(result >> 1) : result >> 1;
    lng += lngDelta;

    coordinates.push([lng / precision, lat / precision]);
  }

  return coordinates;
}

interface FetchDirectionsParams {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  waypoints?: { lat: number; lng: number }[];
}

export const fetchDirections = async (params: FetchDirectionsParams) => {
  const directionResponse = await apiClient.getDirections({
    origin: {
      lat: params.origin.lat,
      lng: params.origin.lng,
    },
    destination: {
      lat: params.destination.lat,
      lng: params.destination.lng,
    },
  });
  return directionResponse;
};

/**
 * Backend response format for autocomplete suggestions
 * Normalized by backend from Mapbox Geocoding API
 */
export interface AutocompleteResponse {
  place_id: string;
  address: string;
  lat: number;
  lng: number;
}

/**
 * Fetch autocomplete suggestions from backend Mapbox geocoding API
 * @param query - Search query string
 * @returns Suggestions array from backend only (no mock fallback)
 */
export const fetchAutocompleteSuggestions = async (
  query: string
): Promise<AutocompleteResponse[]> => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  // Retry a couple times for transient 5xx errors
  const maxAttempts = 2;
  let attempt = 0;
  while (attempt < maxAttempts) {
    attempt++;
    try {
      const response = await apiClient.autocomplete(query);

      // Backend returns array directly OR wrapped in suggestions object
      const suggestions = Array.isArray(response) ? response : response.suggestions;
      
      if (!Array.isArray(suggestions)) {
        console.error("Autocomplete endpoint should return array, got:", typeof response, response);
        return [];
      }

      console.log("[MapService] Raw suggestion sample:", suggestions[0]);

      const validSuggestions = suggestions.filter(
        (item: any): boolean =>
          item &&
          typeof item === "object" &&
          ("place_name" in item || "address" in item) &&
          (Array.isArray(item.center) || (item.lat && item.lng))
      );

      console.log(`[MapService] Autocomplete "${query}" returned ${validSuggestions.length} suggestions`);
      return validSuggestions.map((s: any) => ({
        place_id: s.place_name || s.address || s.id,
        address: s.place_name || s.address,
        lat: s.center ? s.center[1] : s.lat,
        lng: s.center ? s.center[0] : s.lng,
      }));
    } catch (error) {
      console.error(
        `Autocomplete API error (attempt ${attempt}):`,
        error instanceof Error ? error.message : "Unknown error"
      );

      // If server error, try again (simple retry)
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, 250 * attempt));
        continue;
      }

      return [];
    }
  }

  return [];
};

/**
 * Backend response from /routes endpoint
 * Returns array of route alternatives with polyline6 encoded geometry
 */
interface RouteAlternative {
  overview_polyline: string; // polyline6 encoded string
  distance_meters: number;
  duration_seconds: number;
}

/**
 * Transform backend route alternatives to GeoJSON FeatureCollection
 * @param alternatives - Array of route alternatives from backend
 * @returns GeoJSON FeatureCollection with decoded geometries
 */
export function transformRoutesToGeoJSON(alternatives: RouteAlternative[]): GeoJSON.FeatureCollection {
  const features: GeoJSON.Feature[] = alternatives.map((route, index) => {
    // Decode polyline6 to coordinates
    const coordinates = decodePolyline6(route.overview_polyline);

    return {
      type: "Feature",
      id: index,
      geometry: {
        type: "LineString",
        coordinates: coordinates,
      },
      properties: {
        id: index,
        distance: route.distance_meters,
        duration: route.duration_seconds,
        polyline: route.overview_polyline,
        routeName: `Route ${index + 1}`,
      },
    };
  });

  return {
    type: "FeatureCollection",
    features: features,
  };
}

/**
 * Fetch available routes based on departure and arrival coordinates.
 * @param departure - Departure coordinates { lat, lng }.
 * @param arrival - Arrival coordinates { lat, lng }.
 * @returns GeoJSON FeatureCollection with route alternatives.
 */
export const fetchAvailableRoutes = async (
  departure: { lat: number; lng: number },
  arrival: { lat: number; lng: number }
): Promise<GeoJSON.FeatureCollection | null> => {
  try {
    console.log("[MapService] Fetching routes from", { departure, arrival });
    
    const response = await apiClient.getDirections({
      origin: {
        lat: departure.lat,
        lng: departure.lng,
      },
      destination: {
        lat: arrival.lat,
        lng: arrival.lng,
      },
    });

    console.log("[MapService] Raw routes response:", response);

    // Transform route alternatives to GeoJSON
    if (Array.isArray(response.alternatives)) {
      const transformed = transformRoutesToGeoJSON(response.alternatives);
      console.log("[MapService] Transformed routes to GeoJSON:", transformed);
      return transformed;
    }

    console.error("[MapService] Unexpected routes response format:", response);
    return null;
  } catch (error) {
    console.error("[MapService] Error fetching routes:", error);
    return null;
  }
};
