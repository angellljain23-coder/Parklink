"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import { QRCodeSVG } from "qrcode.react";

export default function QRStudioPage() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [baseUrl, setBaseUrl] = useState("");

  // Customization States
  const [themePreset, setThemePreset] = useState("amber");
  const [cardShape, setCardShape] = useState("16px");
  const [showBorder, setShowBorder] = useState(true);

  const themePalettes = {
    amber: {
      bg: "#1e1b4b",
      border: "#f59e0b",
      text: "#fbbf24",
      qrFg: "#0f172a",
    },
    emerald: {
      bg: "#064e3b",
      border: "#22c55e",
      text: "#4ade80",
      qrFg: "#022c22",
    },
    sunset: {
      bg: "#4c0519",
      border: "#f97316",
      text: "#fb923c",
      qrFg: "#1c1917",
    },
    cyber: {
      bg: "#0f172a",
      border: "#38bdf8",
      text: "#7dd3fc",
      qrFg: "#0284c7",
    },
    purple: {
      bg: "#2e1065",
      border: "#a855f7",
      text: "#c084fc",
      qrFg: "#3b0764",
    },
  };

  const currentTheme = themePalettes[themePreset];

  useEffect(() => {
    setBaseUrl(window.location.origin);
    fetch("/api/vehicles")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.vehicles?.length > 0) {
          setVehicles(data.vehicles);
          setSelectedVehicle(data.vehicles[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 50% 0%, #1e1b4b 0%, #0f172a 70%)",
        color: "#f8fafc",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <Navbar />

      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2.5rem 1.5rem",
        }}
      >
        <header style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "2.2rem",
              fontWeight: "800",
              background: "linear-gradient(90deg, #f97316, #eab308)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            🎨 Advanced QR Studio
          </h1>
          <p style={{ margin: "0.4rem 0 0", color: "#94a3b8" }}>
            Design, shape, and export custom high-contrast vehicle windshield
            tags.
          </p>
        </header>

        {vehicles.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>
            Please register a vehicle first to customize its tag.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "2rem",
            }}
          >
            {/* CONTROLS PANEL */}
            <div
              style={{
                backgroundColor: "rgba(30, 41, 59, 0.7)",
                backdropFilter: "blur(12px)",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div>
                <label
                  style={{
                    fontSize: "0.85rem",
                    color: "#cbd5e1",
                    fontWeight: "700",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Select Vehicle
                </label>
                <select
                  onChange={(e) =>
                    setSelectedVehicle(
                      vehicles.find((v) => v._id === e.target.value),
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    borderRadius: "10px",
                    backgroundColor: "#172441",
                    border: "1px solid #334155",
                    color: "#ffffff",
                  }}
                >
                  {vehicles.map((v) => (
                    <option key={v._id} value={v._id}>
                      {v.vehicleNumber} ({v.makeModel || "Vehicle"})
                    </option>
                  ))}
                </select>
              </div>

              {/* Theme Color Picker */}
              <div>
                <label
                  style={{
                    fontSize: "0.85rem",
                    color: "#cbd5e1",
                    fontWeight: "700",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Theme Preset
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: "0.5rem",
                  }}
                >
                  {Object.keys(themePalettes).map((key) => (
                    <button
                      key={key}
                      onClick={() => setThemePreset(key)}
                      style={{
                        height: "40px",
                        borderRadius: "8px",
                        border:
                          themePreset === key
                            ? "2px solid #ffffff"
                            : "1px solid transparent",
                        backgroundColor: themePalettes[key].bg,
                        cursor: "pointer",
                        transition: "transform 0.2s",
                        transform:
                          themePreset === key ? "scale(1.08)" : "scale(1)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Card Corner Styles */}
              <div>
                <label
                  style={{
                    fontSize: "0.85rem",
                    color: "#cbd5e1",
                    fontWeight: "700",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Corner Radius Shape
                </label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {[
                    { label: "Square", radius: "4px" },
                    { label: "Rounded", radius: "16px" },
                    { label: "Pill", radius: "32px" },
                  ].map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setCardShape(s.radius)}
                      style={{
                        flex: 1,
                        padding: "0.6rem",
                        borderRadius: "8px",
                        backgroundColor:
                          cardShape === s.radius ? "#f97316" : "#0f172a",
                        color: "#ffffff",
                        border: "none",
                        fontWeight: "700",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Outer Border Toggle */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "#cbd5e1",
                    fontWeight: "700",
                  }}
                >
                  Show Neon Outer Border
                </span>
                <input
                  type="checkbox"
                  checked={showBorder}
                  onChange={(e) => setShowBorder(e.target.checked)}
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
              </div>

              <button
                onClick={() => window.print()}
                className="animated-btn"
                style={{
                  marginTop: "1rem",
                  padding: "0.9rem",
                  background:
                    "linear-gradient(135deg, #f97316 0%, #eab308 100%)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: "800",
                  fontSize: "1rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(249, 115, 22, 0.4)",
                  transition: "all 0.3s ease",
                }}
              >
                🖨️ Print & Export Sticker
              </button>
            </div>

            {/* LIVE PREVIEW CANVAS */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "#94a3b8",
                  marginBottom: "1rem",
                  fontWeight: "700",
                  letterSpacing: "0.05em",
                }}
              >
                LIVE PHYSICAL PREVIEW
              </span>

              {selectedVehicle && (
                <div
                  style={{
                    width: "320px",
                    backgroundColor: currentTheme.bg,
                    borderRadius: cardShape,
                    border: showBorder
                      ? `3px solid ${currentTheme.border}`
                      : "none",
                    padding: "2rem 1.5rem",
                    textAlign: "center",
                    boxShadow: `0 20px 40px ${currentTheme.border}33`,
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "800",
                      letterSpacing: "0.12em",
                      color: currentTheme.text,
                      textTransform: "uppercase",
                      marginBottom: "0.2rem",
                    }}
                  >
                    PARKLINK SMART TAG
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#cbd5e1",
                      opacity: 0.8,
                      marginBottom: "1.25rem",
                    }}
                  >
                    Scan to notify owner instantly
                  </div>

                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "1rem",
                      borderRadius: "12px",
                      display: "inline-block",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <QRCodeSVG
                      value={`${baseUrl}/p/${selectedVehicle.qrHash}`}
                      size={160}
                      level="H"
                      fgColor={currentTheme.qrFg}
                    />
                  </div>

                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "900",
                      letterSpacing: "0.05em",
                      color: "#ffffff",
                    }}
                  >
                    {selectedVehicle.vehicleNumber}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: currentTheme.text,
                      marginTop: "0.3rem",
                      fontWeight: "600",
                    }}
                  >
                    {selectedVehicle.makeModel || "Secured Vehicle Endpoint"}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .animated-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(249, 115, 22, 0.6) !important;
        }
      `}</style>
    </div>
  );
}
