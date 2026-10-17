import React from "react";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent white overlay
  backdropFilter: "blur(5px)", // Blur effect
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999, // Ensures it's above other elements
};

const dotContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
};

const dotStyle = {
  width: "15px",
  height: "15px",
  borderRadius: "50%",
  backgroundColor: "#3498db",
  animation: "bounce 1.5s infinite",
};

const Loader = () => {
  return (
    <div style={overlayStyle}>
      <div style={dotContainerStyle}>
        <div style={{ ...dotStyle, animationDelay: "0s" }}></div>
        <div style={{ ...dotStyle, animationDelay: "0.3s" }}></div>
        <div style={{ ...dotStyle, animationDelay: "0.6s" }}></div>
      </div>
      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% {
              transform: scale(0);
              opacity: 0.5;
            }
            40% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
