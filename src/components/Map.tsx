import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, Polygon } from "@react-google-maps/api";
import { polygons } from "../polygons/districtConfig";

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
  const [polygonData, setPolygonData] = useState<typeof polygons | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setPolygonData(polygons);
    }, 100);
  }, []);

  const handlePolygonClick = (name: string) => {
    alert(`You clicked on ${name}`);
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCQWZOvyYbdhpAUfP00vB_XEbg4XY4WwF0"
      // googleMapsApiKey="asdasdasdasd"
      onLoad={() => setIsLoaded(true)}
    >
      {isLoaded && polygonData && (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
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
            onClick={() => handlePolygonClick(polygon.name)}
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
  );
};

export default Map;
