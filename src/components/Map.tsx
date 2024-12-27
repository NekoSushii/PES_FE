import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker, Polygon } from "@react-google-maps/api";
import { districtPolygons } from "../polygons/districtConfig";

const containerStyle = {
  width: "100%",
  height: "80%",
};

const center = {
  lat: 1.3521,
  lng: 103.8198,
};

const Map: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [polygonData, setPolygonData] = useState<typeof districtPolygons | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setPolygonData(districtPolygons);
    }, 100);
  }, []);

  const handlePolygonClick = (polygon: typeof districtPolygons[0]) => {
    if (mapInstance) {
      const bounds = new google.maps.LatLngBounds();
      polygon.path.forEach((coord) => bounds.extend(coord));
      mapInstance.fitBounds(bounds);
    }
  };

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <LoadScript
        googleMapsApiKey="AIzaSyCQWZOvyYbdhpAUfP00vB_XEbg4XY4WwF0"
        onLoad={() => setIsLoaded(true)}
      >
        {isLoaded && polygonData && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={(map) => {
              setMapInstance(map);
              mapRef.current = map;
            }}
          >
            {polygonData.map((polygon) => (
              <Polygon
                key={polygon.id}
                paths={polygon.path}
                options={{
                  fillColor: polygon.fillColor,
                  fillOpacity: 0.4,
                  strokeColor: polygon.fillColor,
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  clickable: true,
                  draggable: false,
                  editable: false,
                }}
                onClick={() => handlePolygonClick(polygon)}
              />
            ))}

            {polygonData.map((polygon) => (
              <Marker
                key={`label-${polygon.id}`}
                position={polygon.center}
                label={{
                  text: polygon.name,
                  color: "black",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
                options={{ icon: { path: google.maps.SymbolPath.CIRCLE, scale: 0 } }}
              />
            ))}
          </GoogleMap>
        )}
      </LoadScript>
    </div>
  );
};

export default Map;
