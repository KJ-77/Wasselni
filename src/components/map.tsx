import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN ?? "pk.eyJ1IjoicmFtaS1uYXNyMDEiLCJhIjoiY21oaHQ1aHIyMHJ5czJqczd0a20yYmYwbyJ9.8FDq02CuNmGDmtuE2rTKEw";

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

  return (
    <div
      ref={mapContainer}
      className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-inner border border-slate-700"
      style={{ backgroundColor: "#1e293b" }} // dark slate fallback
    />
  );
}
