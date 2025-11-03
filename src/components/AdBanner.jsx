// src/components/AdBanner.jsx
import React, { useEffect } from "react";

const AdBanner = ({ slot, width = "100%", height = 90, style = {} }) => {
  useEffect(() => {
    // Real AdSense would require (window.adsbygoogle = window.adsbygoogle || []).push({});
    // We don't have AdSense script in testing — so do nothing.
  }, [slot]);

  if (!slot) {
    // Return empty div with fixed height to prevent layout shift
    return <div style={{ height: `${height}px`, width }} />;
  }

  // Mock visual box with fixed dimensions - CRITICAL for CLS
  return (
    <div
      role="region"
      aria-label={`Ad placeholder ${slot}`}
      style={{
        width,
        height: `${height}px`, // Force exact height as string with px
        minHeight: `${height}px`, // Ensure minimum height
        maxHeight: `${height}px`, // Prevent expansion
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed #2b6cb0",
        borderRadius: 8,
        background: "#f0f8ff",
        color: "#075985",
        fontWeight: 600,
        margin: "12px 0",
        flexShrink: 0, // Prevent shrinking
        overflow: "hidden", // Prevent content overflow
        ...style,
      }}
    >
      Ad placeholder — slot: {slot}
    </div>
  );
};

export default AdBanner;
