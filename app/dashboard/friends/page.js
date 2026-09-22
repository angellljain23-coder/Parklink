"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function FriendsPage() {
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: "Alex Rivera",
      vehicle: "DL 04 CP 9988",
      status: "Parked nearby",
      online: true,
    },
    {
      id: 2,
      name: "Priya Sharma",
      vehicle: "KA 01 MH 4321",
      status: "In Transit",
      online: false,
    },
    {
      id: 3,
      name: "David Chen",
      vehicle: "MH 02 BG 1122",
      status: "Parked at Sector 62",
      online: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "#f8fafc",
      }}
    >
      <Navbar />
      <main
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "2.5rem 1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h1
              style={{
                color: "#f97316",
                margin: "0 0 0.5rem",
                fontSize: "2rem",
              }}
            >
              👥 Connect with Friends
            </h1>
            <p style={{ color: "#94a3b8", margin: 0 }}>
              Add trusted drivers to quickly coordinate parking and emergency
              alerts.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: "2rem" }}>
          <input
            type="text"
            placeholder="Search friends by name or vehicle plate..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.85rem 1rem",
              backgroundColor: "#1e293b",
              border: "2px solid #334155",
              borderRadius: "10px",
              color: "#ffffff",
              fontSize: "1rem",
            }}
          />
        </div>

        {/* Friends Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {friends
            .filter(
              (f) =>
                f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                f.vehicle.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map((friend) => (
              <div
                key={friend.id}
                style={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "14px",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "1.1rem",
                        color: "#ffffff",
                      }}
                    >
                      {friend.name}
                    </h3>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "10px",
                        backgroundColor: friend.online
                          ? "rgba(34, 197, 94, 0.2)"
                          : "rgba(148, 163, 184, 0.2)",
                        color: friend.online ? "#4ade80" : "#94a3b8",
                      }}
                    >
                      {friend.online ? "Online" : "Offline"}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: "0 0 0.25rem",
                      color: "#eab308",
                      fontWeight: "700",
                      fontSize: "0.9rem",
                    }}
                  >
                    🚘 {friend.vehicle}
                  </p>
                  <p
                    style={{
                      margin: "0 0 1.25rem",
                      color: "#94a3b8",
                      fontSize: "0.8rem",
                    }}
                  >
                    📍 {friend.status}
                  </p>
                </div>

                <a
                  href={`/dashboard/chat?vehicle=${encodeURIComponent(friend.vehicle)}`}
                  style={{
                    textAlign: "center",
                    padding: "0.65rem",
                    backgroundColor: "#22c55e",
                    color: "#ffffff",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "700",
                    fontSize: "0.875rem",
                  }}
                >
                  💬 Send Message
                </a>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
