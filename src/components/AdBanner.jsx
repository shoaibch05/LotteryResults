// src/components/AdBanner.jsx
import React, { useEffect } from "react";

const AdBanner = ({ slot, width = "100%", height = 90, style = {} }) => {
  useEffect(() => {
    // Real AdSense would require (window.adsbygoogle = window.adsbygoogle || []).push({});
    // We don't have AdSense script in testing — so do nothing.
  }, [slot]);

  if (!slot) return null;

  // Mock visual box so the admin and devs can see placement
  return (
    <div
      role="region"
      aria-label={`Ad placeholder ${slot}`}
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed #2b6cb0",
        borderRadius: 8,
        background: "#f0f8ff",
        color: "#075985",
        fontWeight: 600,
        margin: "12px 0",
        ...style,
      }}
    >
      Ad placeholder — slot: {slot}
    </div>
  );
};

export default AdBanner;
