import { useRef, useEffect, useState } from "react";
import Map, { Source, Layer } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { fetchDirections } from "@/services/MapService";
import polyline from "@mapbox/polyline";
import mapboxgl from "mapbox-gl";

type MapProps = {
  origin?: { lat: number; lng: number };
  destination?: { lat: number; lng: number };
  className?: string;
  routes?: any; // GeoJSON data for routes (FeatureCollection or Feature)
  selectedRouteId?: string; // ID of selected route
  onRouteSelect?: (route: any) => void; // Callback when user selects a route
};

function MapboxMap({ origin, destination, className, routes, selectedRouteId, onRouteSelect }: MapProps) {
  const mapRef = useRef<any>(null);
  const [route, setRoute] = useState<any>(null);

  useEffect(() => {
    if (origin && destination && mapRef.current) {
      const getRoute = async () => {
        try {
          const directions = await fetchDirections({ origin, destination });
          if (directions.alternatives && directions.alternatives.length > 0) {
            const route = directions.alternatives[0];
            const decodedPolyline = polyline.decode(route.overview_polyline);
            const routeGeoJSON = {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: decodedPolyline.map(([lat, lng]) => [lng, lat]),
              },
            };
            setRoute(routeGeoJSON);

            const bounds = new mapboxgl.LngLatBounds();
            routeGeoJSON.geometry.coordinates.forEach((coord) => {
              bounds.extend(coord as [number, number]);
            });

            mapRef.current?.fitBounds(bounds, { padding: 50 });
          }
        } catch (error) {
          console.error("Error fetching directions:", error);
        }
      };
      getRoute();
    }

    if (routes && mapRef.current) {
      // Handle both FeatureCollection and Feature formats
      let features: any[] = [];
      
      if (routes.type === "FeatureCollection" && Array.isArray(routes.features)) {
        features = routes.features;
      } else if (routes.type === "Feature") {
        features = [routes];
      } else if (Array.isArray(routes)) {
        features = routes;
      }

      // Create a FeatureCollection for the source
      const featureCollection: any = {
        type: "FeatureCollection" as const,
        features: features.map((f, idx) => ({
          ...f,
          id: f.id || idx,
          properties: { ...f.properties, isSelected: f.id === selectedRouteId || idx === 0 },
        })),
      };

      const source = mapRef.current.getSource("routes") as mapboxgl.GeoJSONSource;
      if (source) {
        source.setData(featureCollection as any);
      } else {
        mapRef.current.addSource("routes", {
          type: "geojson",
          data: featureCollection,
        });

        // Add layer for unselected routes
        mapRef.current.addLayer({
          id: "routes",
          type: "line",
          source: "routes",
          filter: ["!=", "isSelected", true],
          paint: {
            "line-color": "#007cbf",
            "line-width": 3,
            "line-opacity": 0.6,
          },
        });

        // Add layer for selected/hovered routes
        mapRef.current.addLayer({
          id: "routes-selected",
          type: "line",
          source: "routes",
          filter: ["==", "isSelected", true],
          paint: {
            "line-color": "#059669",
            "line-width": 5,
            "line-opacity": 1,
          },
        });

        // Add layer for hovered routes (disabled for now - can be enhanced later)
        // mapRef.current.addLayer({
        //   id: "routes-hover",
        //   type: "line",
        //   source: "routes",
        //   filter: ["==", "id", ""],
        //   paint: {
        //     "line-color": "#f59e0b",
        //     "line-width": 5,
        //     "line-opacity": 1,
        //   },
        // });

        // Add click handler for route selection
        mapRef.current.on("click", "routes", (e: any) => {
          if (e.features && e.features.length > 0) {
            const clickedFeature = e.features[0];
            if (onRouteSelect) {
              onRouteSelect(clickedFeature);
            }
          }
        });

        // Add hover effects
        mapRef.current.on("mouseenter", "routes", () => {
          mapRef.current.getCanvas().style.cursor = "pointer";
        });

        mapRef.current.on("mouseleave", "routes", () => {
          mapRef.current.getCanvas().style.cursor = "";
        });
      }

      // Fit bounds to all routes
      if (features.length > 0 && features[0].geometry) {
        const bounds = new mapboxgl.LngLatBounds();
        features.forEach((feature) => {
          if (feature.geometry.type === "LineString") {
            feature.geometry.coordinates.forEach((coord: [number, number]) => {
              bounds.extend(coord);
            });
          }
        });
        mapRef.current?.fitBounds(bounds, { padding: 50 });
      }
    }
  }, [origin, destination, routes, selectedRouteId, onRouteSelect]);

  return (
    <div className={`${className ?? "w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-inner border border-slate-700"}`}
      style={{ backgroundColor: "#1e293b" }}>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 35.5018,
          latitude: 33.8938,
          zoom: 12,
          bearing: 0,
          pitch: 0,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN as string}
      >
        {route && (
          <Source id="route" type="geojson" data={route}>
            <Layer
              id="route"
              type="line"
              source="route"
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color": "#059669",
                "line-width": 5,
              }}
            />
          </Source>
        )}
      </Map>
    </div>
  );
}
export default MapboxMap;