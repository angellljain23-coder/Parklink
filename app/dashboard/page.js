"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Scanner from "../components/Scanner"; // Ensure filename is Scanner.js
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();

  const [vehicles, setVehicles] = useState([
    { _id: "1", plateNumber: "ABC-1234", makeModel: "Tesla Model 3" },
    { _id: "2", plateNumber: "XYZ-9876", makeModel: "Toyota RAV4" },
  ]);

  const [loading, setLoading] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const [selectedVehicleQR, setSelectedVehicleQR] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  // When OCR detects a plate number, redirect directly to the /alert page
  const handlePlateDetected = (plateNumber) => {
    if (plateNumber) {
      router.push(`/alert?plate=${encodeURIComponent(plateNumber)}`);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-dark)",
        paddingBottom: "4rem",
      }}
    >
      <Navbar />

      <main
        style={{ maxWidth: "1150px", margin: "0 auto", padding: "2rem 1rem" }}
      >
        {/* --- SECTION 1: STATS OVERVIEW --- */}
        <section className="stats-grid">
          <div className="glass-stat-card card-glow-magenta">
            <div
              className="stat-icon"
              style={{ color: "var(--secondary-glow)" }}
            >
              🚨
            </div>
            <div>
              <p className="stat-label">Alerts Received</p>
              <h3 className="stat-value">4</h3>
            </div>
          </div>

          <div className="glass-stat-card card-glow-blue">
            <div className="stat-icon" style={{ color: "var(--primary-glow)" }}>
              📡
            </div>
            <div>
              <p className="stat-label">Dispatched</p>
              <h3 className="stat-value">2</h3>
            </div>
          </div>

          <div className="glass-stat-card card-glow-green">
            <div className="stat-icon" style={{ color: "var(--accent-green)" }}>
              🚘
            </div>
            <div>
              <p className="stat-label">Registered Vehicles</p>
              <h3 className="stat-value">{vehicles.length}</h3>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: EYE-CATCHING CAMERA FEATURE --- */}
        <section className="scanner-hero-wrapper">
          <h2 className="scanner-hero-title">⚡ AI Vehicle Plate Scanner</h2>
          <p className="scanner-hero-subtitle">
            Scan a vehicle license plate to initiate an instant alert or call.
          </p>

          <div className="scanner-container-card scanner-active-glow">
            <Scanner onPlateDetected={handlePlateDetected} />
          </div>
        </section>

        {/* --- SECTION 3: REGISTERED VEHICLES MANAGEMENT --- */}
        <section style={{ marginTop: "3rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "800",
                  color: "#fff",
                  margin: 0,
                }}
              >
                My Registered Vehicles
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  margin: 0,
                  fontSize: "0.9rem",
                }}
              >
                Manage your tagged vehicles and display their QR codes.
              </p>
            </div>

            <Link
              href="/register"
              style={{
                backgroundColor: "var(--primary-glow)",
                color: "#000",
                padding: "0.6rem 1.2rem",
                borderRadius: "10px",
                fontWeight: "700",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              + Add Vehicle
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {vehicles.map((v) => (
              <div
                key={v._id}
                className="glass-stat-card"
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        margin: 0,
                        color: "#fff",
                        fontSize: "1.2rem",
                        fontWeight: "700",
                      }}
                    >
                      {v.plateNumber}
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        color: "var(--text-secondary)",
                        fontSize: "0.85rem",
                      }}
                    >
                      {v.makeModel}
                    </p>
                  </div>
                  <span style={{ fontSize: "1.5rem" }}>🏎️</span>
                </div>

                {/* Show/Hide QR Button Only */}
                <div style={{ width: "100%", marginTop: "0.5rem" }}>
                  <button
                    onClick={() =>
                      setSelectedVehicleQR(
                        selectedVehicleQR === v._id ? null : v._id,
                      )
                    }
                    style={{
                      width: "100%",
                      backgroundColor: "rgba(14, 165, 233, 0.15)",
                      border: "1px solid rgba(14, 165, 233, 0.4)",
                      color: "#38bdf8",
                      padding: "0.6rem",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    {selectedVehicleQR === v._id
                      ? "Hide QR Code"
                      : "Show QR Code"}
                  </button>
                </div>

                {/* Clean QR Code Display (Text removed) */}
                {selectedVehicleQR === v._id && (
                  <div
                    style={{
                      width: "100%",
                      textAlign: "center",
                      padding: "1.25rem",
                      backgroundColor: "#fff",
                      borderRadius: "12px",
                      marginTop: "0.5rem",
                    }}
                  >
                    <QRCodeSVG
                      value={`${baseUrl}/p/${v.plateNumber}`}
                      size={160}
                      style={{ margin: "0 auto" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
