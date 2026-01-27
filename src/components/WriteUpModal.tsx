import React from "react";
import { WriteUp } from "../firebase/writeupService";
import { PolygonConfig } from "../polygons/districtConfig";

interface WriteUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  writeUps: WriteUp[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onContributeClick: () => void;
  selectedPolygon: PolygonConfig | null;
}

const WriteUpModal: React.FC<WriteUpModalProps> = ({
  isOpen,
  onClose,
  writeUps,
  currentIndex,
  onPrev,
  onNext,
  onContributeClick,
  selectedPolygon,
}) => {
  if (!isOpen) return null;

  const currentWriteUp = writeUps[currentIndex];

  return (
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
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "15px",
          background: "none",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          color: "#666",
        }}
      >
        &times;
      </button>

      {/* Contribute Review Button */}
      <button
        onClick={onContributeClick}
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          padding: "8px 16px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Contribute Review
      </button>

      {currentWriteUp ? (
        <>
          {/* Reviewer info */}
          <p
            style={{
              marginTop: "10px",
              color: "#666",
              fontSize: "14px",
              fontStyle: "italic",
            }}
          >
            Reviewed by: {currentWriteUp.reviewBy || "Anonymous"}
          </p>

          <h2>{currentWriteUp.title}</h2>
          <p>
            <strong>Type:</strong> {currentWriteUp.type}
          </p>
          <p>
            <strong>Tenure:</strong> {currentWriteUp.tenure}
          </p>
          <p>
            <strong>Year of Review:</strong> {currentWriteUp.yearOfReview}
          </p>

          {/* Pagination controls */}
          {writeUps.length > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                margin: "20px 0",
                padding: "10px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              <button
                onClick={onPrev}
                disabled={currentIndex === 0}
                style={{
                  padding: "10px 20px",
                  backgroundColor: currentIndex === 0 ? "#ccc" : "#007BFF",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                  fontSize: "16px",
                }}
              >
                ← Previous
              </button>
              <span style={{ fontSize: "14px", color: "#666" }}>
                Review {currentIndex + 1} of {writeUps.length}
              </span>
              <button
                onClick={onNext}
                disabled={currentIndex === writeUps.length - 1}
                style={{
                  padding: "10px 20px",
                  backgroundColor:
                    currentIndex === writeUps.length - 1 ? "#ccc" : "#007BFF",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor:
                    currentIndex === writeUps.length - 1
                      ? "not-allowed"
                      : "pointer",
                  fontSize: "16px",
                }}
              >
                Next →
              </button>
            </div>
          )}

          <div dangerouslySetInnerHTML={{ __html: currentWriteUp.content }} />
        </>
      ) : (
        <>
          <h2 style={{ marginTop: "20px" }}>{selectedPolygon?.name}</h2>
          <p style={{ marginTop: "20px", color: "#666" }}>
            No review available yet. Be the first to contribute!
          </p>
        </>
      )}

      <button
        onClick={onClose}
        style={{
          marginTop: "20px",
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
  );
};

export default WriteUpModal;
