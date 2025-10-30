import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// to configure Mapbox with the access token founnd in .env.local
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;


// we start creating our map component
export default function Map() {

    const mapRef = useRef(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapRef.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [35.8623, 33.8869], // Centered on Lebanon
            zoom: 7,
        });
        return () => {
            map.remove();
        };
    }, []);
  
    return <div 
    className="w-full h-[500px] md:h-[600px] rounded-2xl transition-all duration-500 shadow-inner"
  />;
}


