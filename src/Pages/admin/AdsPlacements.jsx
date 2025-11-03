// src/pages/admin/AdPlacememt.jsx
import React, { useState } from "react";
import { useAds } from "../../context/AdProvider";

/**
 * Very simple no-auth admin UI for testing.
 * In production you must secure this route.
 */

const AdminPanel = () => {
  const { ads, updateAd, addAd, removeAd } = useAds();
  const pages = Object.keys(ads || {});
  const [selectedPage, setSelectedPage] = useState(pages[0] || "");
  const [newPosition, setNewPosition] = useState("");
  const [newSlot, setNewSlot] = useState("");

  const pageArr = ads?.[selectedPage] ?? [];
  console.log(Object.keys);

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin — Ad Placement Editor</h1>

      <div style={{ marginBottom: 12 }}>
        <label>
          Choose page:{" "}
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
          >
            {pages.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginBottom: 18 }}>
        <h3>{selectedPage} placements</h3>
        {pageArr.length === 0 && <p>No placements configured for this page.</p>}

        {pageArr.map((row, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: 8,
              padding: 8,
              border: "1px solid #ddd",
              borderRadius: 6,
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <div style={{ width: 160 }}>
              <small>position</small>
              <div>{row.position}</div>
            </div>

            <div style={{ width: 220 }}>
              <small>slot</small>
              <input
                value={row.slot}
                onChange={(e) =>
                  updateAd(selectedPage, idx, { slot: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="checkbox"
                checked={row.enabled}
                onChange={(e) =>
                  updateAd(selectedPage, idx, { enabled: e.target.checked })
                }
              />
              <small>enabled</small>
            </label>

            <button onClick={() => removeAd(selectedPage, idx)}>Remove</button>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 20 }}>
        <h4>Add new placement</h4>
        <input
          placeholder="position (e.g. underHeader)"
          value={newPosition}
          onChange={(e) => setNewPosition(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          placeholder="slot (string)"
          value={newSlot}
          onChange={(e) => setNewSlot(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button
          onClick={() => {
            if (!selectedPage) return alert("Select a page first");
            if (!newPosition) return alert("Enter a position");
            addAd(selectedPage, {
              position: newPosition,
              slot: newSlot || "TEST-NEW",
              enabled: true,
            });
            setNewPosition("");
            setNewSlot("");
          }}
        >
          Add
        </button>
      </div>

      <div style={{ color: "#666", marginTop: 12 }}>
        <strong>Note:</strong> Changes are saved to localStorage for testing
        only.
      </div>
    </div>
  );
};

export default AdminPanel;
