import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type MapProps = {
  rides?: any[];
  highlightedRideId?: string | number | null;
  className?: string;
};

function Map({ rides, highlightedRideId, className }: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN ??
      "pk.eyJ1IjoicmFtaS1uYXNyMDEiLCJhIjoiY21oaHQ1aHIyMHJ5czJqczd0a20yYmYwbyJ9.8FDq02CuNmGDmtuE2rTKEw";

    try {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [35.5018, 33.8938], // Beirut
        zoom: 12,
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      mapRef.current.on("load", () => {
        console.log("✅ Map loaded successfully");
      });
    } catch (err) {
      console.error("❌ Mapbox initialization failed:", err);
    }
  }, []);

  // TODO: if `rides` are provided, add markers or routes here.
  // avoid unused variable lint when props are not used yet
  void rides;
  void highlightedRideId;

  return (
    <div
      ref={mapContainer}
      className={`${className ?? "w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-inner border border-slate-700"}`}
      style={{ backgroundColor: "#1e293b" }}
    />
  );
}
export default Map;