import { GoogleMap, LoadScript, Marker, Polygon } from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";
import { bedokPolygons } from "../polygons/bedokConfig";
import { districtPolygons, PolygonConfig } from "../polygons/districtConfig";
import { hougangPolygons } from "../polygons/hougangConfig";
import { museumPolygons } from "../polygons/MuseumConfig";
import { rochorPolygons } from "../polygons/rochorConfig";
import { useWriteUps } from "../hooks/useWriteUps";
import { WriteUp } from "../firebase/writeupService";
import ContributeModal from "./ContributeModal";
import Toast from "./Toast";
import WriteUpModal from "./WriteUpModal";

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
  const [modalWriteUps, setModalWriteUps] = useState<WriteUp[]>([]);
  const [currentWriteUpIndex, setCurrentWriteUpIndex] = useState(0);
  
  // Contribute modal state
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);
  const [selectedPolygon, setSelectedPolygon] = useState<PolygonConfig | null>(null);
  
  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const mapRef = useRef<google.maps.Map | null>(null);
  
  const { getWriteUpsById, loading: writeUpsLoading } = useWriteUps(focusedDistrict);

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

  const handlePropertyPolygonClickModal = (polygon: PolygonConfig) => {
    if (isFocused && !writeUpsLoading) {
      setSelectedPolygon(polygon);
      const writeUps = getWriteUpsById(polygon.id);
      setModalWriteUps(writeUps);
      setCurrentWriteUpIndex(0);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalWriteUps([]);
    setCurrentWriteUpIndex(0);
  };

  const handleBackClick = () => {
    if (mapInstance) {
      mapInstance.setCenter(center);
      mapInstance.setZoom(maxZoomOutScale);
      setIsFocused(false);
      setFocusedPolygonData(null);
      setFocusedDistrict(null);
    }
  };

  const handleContributeClick = () => {
    setIsModalOpen(false);
    setIsContributeModalOpen(true);
  };

  const handleContributionSuccess = () => {
    setToast({ message: 'Review submitted successfully! It will be reviewed before publishing.', type: 'success' });
  };

  const handlePrevWriteUp = () => {
    setCurrentWriteUpIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextWriteUp = () => {
    setCurrentWriteUpIndex(prev => Math.min(modalWriteUps.length - 1, prev + 1));
  };

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
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

      {/* WriteUp Modal */}
      <WriteUpModal
        isOpen={isModalOpen}
        onClose={closeModal}
        writeUps={modalWriteUps}
        currentIndex={currentWriteUpIndex}
        onPrev={handlePrevWriteUp}
        onNext={handleNextWriteUp}
        onContributeClick={handleContributeClick}
        selectedPolygon={selectedPolygon}
      />

      {/* Contribute Modal */}
      {selectedPolygon && focusedDistrict && (
        <ContributeModal
          isOpen={isContributeModalOpen}
          onClose={() => setIsContributeModalOpen(false)}
          polygonId={selectedPolygon.id}
          districtId={focusedDistrict}
          polygonName={selectedPolygon.name}
          onSuccess={handleContributionSuccess}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Map;
