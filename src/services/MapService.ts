// src/services/MapService.ts

// Backend API endpoint base URL
// Uses AWS backend directly (no local proxy needed)
const BASE_URL = "https://rl4ynabhzk.execute-api.me-central-1.amazonaws.com";

interface FetchDirectionsParams {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  waypoints?: { lat: number; lng: number }[];
}

export const fetchDirections = async (params: FetchDirectionsParams) => {
  const response = await fetch(`${BASE_URL}/directions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch directions");
  }

  return response.json();
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
      const response = await fetch(`${BASE_URL}/autocomplete?q=${encodeURIComponent(query)}`);

      if (!response.ok) {
        // Read response body for diagnostics if possible
        let bodyText: string | undefined;
        try {
          bodyText = await response.text();
        } catch (e) {
          bodyText = undefined;
        }
        console.error(
          `Autocomplete API error (attempt ${attempt}):`,
          response.status,
          response.statusText,
          bodyText || "<no body>"
        );

        // If server error, try again (simple retry); client errors won't be retried
        if (response.status >= 500 && attempt < maxAttempts) {
          // small backoff
          await new Promise((r) => setTimeout(r, 250 * attempt));
          continue;
        }

        return [];
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const txt = await response.text().catch(() => "<unreadable>");
        console.error(
          "Autocomplete endpoint returned non-JSON response. Verify backend is configured correctly.",
          { contentType, url: `${BASE_URL}/autocomplete?q=${query}`, body: txt }
        );
        return [];
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        console.error("Autocomplete endpoint should return array, got:", typeof data, data);
        return [];
      }

      const validSuggestions = data.filter(
        (item): item is AutocompleteResponse =>
          item &&
          typeof item === "object" &&
          typeof item.place_id === "string" &&
          typeof item.address === "string" &&
          typeof item.lat === "number" &&
          typeof item.lng === "number"
      );

      if (validSuggestions.length === 0 && data.length > 0) {
        console.warn("Backend returned suggestions but none matched expected format. Sample:", data[0]);
      }

      return validSuggestions;
    } catch (error) {
      console.error(`Autocomplete fetch exception (attempt ${attempt}):`, error);
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, 250 * attempt));
        continue;
      }
      return [];
    }
  }
  return [];
};
