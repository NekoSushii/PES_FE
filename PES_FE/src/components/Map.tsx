import React, { useState } from "react";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";
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

  const handlePolygonClick = (name: string) => {
    alert(`You clicked on ${name}`);
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCQWZOvyYbdhpAUfP00vB_XEbg4XY4WwF0"
      onLoad={() => setIsLoaded(true)}
    >
      {isLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          {polygons.map((polygon) => (
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
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default Map;
