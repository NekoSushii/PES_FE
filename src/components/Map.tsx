import { GoogleMap, LoadScript, Marker, Polygon } from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";
import { bedokPolygons, bedokWriteUp } from "../polygons/bedokConfig";
import { districtPolygons, PolygonConfig } from "../polygons/districtConfig";
import { hougangPolygons, hougangWriteUp } from "../polygons/hougangConfig";
import { museumPolygons, museumWriteUp } from "../polygons/MuseumConfig";
import { rochorPolygons, rochorWriteUp } from "../polygons/rochorConfig";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 1.3521,
  lng: 103.8198,
};

const districtPolygonMapping: Record<number, PolygonConfig[]> = {
  1: bedokPolygons,
  34: hougangPolygons,
  42: museumPolygons,
  47: rochorPolygons,
};

const maxZoomOutScale = 12;

const Map: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [polygonData, setPolygonData] = useState<typeof districtPolygons | null>(null);
  const [focusedPolygonData, setFocusedPolygonData] = useState<PolygonConfig[] | null>(null);
  const [focusedDistrict, setFocusedDistrict] = useState<number | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);

  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    // So that the polygons data can be fetched before maps try to render it, else it might not render at all
    setTimeout(() => {
      setPolygonData(districtPolygons);
    }, 100);

    // When modal is open, the map component's overflow is not active, so user will only scroll in modal
    if (isModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isModalOpen]);

  const handleDistrictPolygonClick = (polygon: typeof districtPolygons[0]) => {
    if (mapInstance) {
      const bounds = new google.maps.LatLngBounds();
      polygon.path.forEach(coord => bounds.extend(coord));
  
      mapInstance.fitBounds(bounds);
  
      google.maps.event.addListenerOnce(mapInstance, "idle", () => {
        mapInstance.setZoom(14.5);
      });
  
      setIsFocused(true);
      const districtPolygons = districtPolygonMapping[polygon.id as number] ?? null;
      setFocusedPolygonData(districtPolygons);
      setFocusedDistrict(polygon.id);
    }
  };

  const handlePropertyPolygonClickModal = (polygon: typeof bedokPolygons[0]) => {
    if (isFocused) {
      var writeUp = null; 
      if (focusedDistrict === 1) {
        writeUp = bedokWriteUp.find((writeUp) => writeUp.id === polygon.id);
      } else if (focusedDistrict === 34) {
        writeUp = hougangWriteUp.find((writeUp) => writeUp.id === polygon.id);
      } else if (focusedDistrict === 42) {
        writeUp = museumWriteUp.find((writeUp) => writeUp.id === polygon.id);
      } else if (focusedDistrict === 47) {
        writeUp = rochorWriteUp.find((writeUp) => writeUp.id === polygon.id);
      }
      if (writeUp) {
        setModalContent(writeUp);
        setIsModalOpen(true);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleBackClick = () => {
    if (mapInstance) {
      mapInstance.setCenter(center);
      mapInstance.setZoom(maxZoomOutScale);
      setIsFocused(false);
      setFocusedPolygonData(null);
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
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={maxZoomOutScale}
            onLoad={(map) => {
              setMapInstance(map);
              mapRef.current = map;
            }}
            options={{
              gestureHandling: "greedy",
              scrollwheel: true,
              draggable: true,
              disableDoubleClickZoom: true,
            }}
          >
            {!isFocused &&
              polygonData.map((polygon) => (
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
                  onClick={() => handleDistrictPolygonClick(polygon)}
                />
              ))}

            {isFocused &&
              focusedPolygonData &&
              focusedPolygonData.map((polygon) => (
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
                  onClick={() => handlePropertyPolygonClickModal(polygon)}
                />
              ))}

            {!isFocused && polygonData.map((polygon) => (
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

      {isFocused && (
        <button
          onClick={handleBackClick}
          style={{
            position: "absolute",
            top: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: "pointer",
            color: "white",
          }}
        >
          Reset View
        </button>
      )}
      {isModalOpen && modalContent && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "95vw",
            height: "95vh",
            backgroundColor: "white",
            padding: "20px",
            boxSizing: "border-box",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            color: "black",
            overflow: "auto",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <h2>{modalContent.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: modalContent.content }} />
          <button
            onClick={closeModal}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Map;
