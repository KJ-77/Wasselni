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
};

function MapboxMap({ origin, destination, className }: MapProps) {
  const mapRef = useRef<any>(null);
  const [route, setRoute] = useState<any>(null);

  useEffect(() => {
    if (origin && destination && mapRef.current) {
      const getRoute = async () => {
        try {
          const directions = await fetchDirections({ origin, destination });
          if (directions.routes && directions.routes.length > 0) {
            const route = directions.routes[0];
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
  }, [origin, destination]);

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