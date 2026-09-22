"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ParkLinkLogo from "../components/ParkLinkLogo";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    vehicleNumber: "",
    ownerPhone: "",
    makeModel: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/dashboard");
      } else {
        setErrorMsg(data.error || "Failed to register tag.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error. Navigating to Dashboard...");
      setTimeout(() => router.push("/dashboard"), 1500);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#1e293b",
          border: "2px solid #334155",
          borderRadius: "20px",
          width: "480px",
          maxWidth: "100%",
          padding: "2.5rem",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <ParkLinkLogo size="large" dark={true} />
          <p
            style={{
              color: "#94a3b8",
              fontSize: "0.9rem",
              marginTop: "0.5rem",
            }}
          >
            Create a new vehicle tag in seconds.
          </p>
        </div>

        {errorMsg && (
          <div
            style={{
              backgroundColor: "#991b1b",
              color: "#fef2f2",
              padding: "0.75rem",
              borderRadius: "8px",
              fontSize: "0.85rem",
              marginBottom: "1rem",
            }}
          >
            {errorMsg}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <label
            style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
          >
            <span
              style={{
                fontSize: "0.85rem",
                color: "#cbd5e1",
                fontWeight: "700",
              }}
            >
              License Plate Number *
            </span>
            <input
              type="text"
              required
              placeholder="e.g. KA 01 MJ 5678"
              value={form.vehicleNumber}
              onChange={(e) =>
                setForm({
                  ...form,
                  vehicleNumber: e.target.value.toUpperCase(),
                })
              }
              style={{
                padding: "0.8rem",
                borderRadius: "8px",
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                color: "#ffffff",
              }}
            />
          </label>

          <label
            style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
          >
            <span
              style={{
                fontSize: "0.85rem",
                color: "#cbd5e1",
                fontWeight: "700",
              }}
            >
              Owner Phone Number *
            </span>
            <input
              type="tel"
              required
              placeholder="+919876543210"
              value={form.ownerPhone}
              onChange={(e) => setForm({ ...form, ownerPhone: e.target.value })}
              style={{
                padding: "0.8rem",
                borderRadius: "8px",
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                color: "#ffffff",
              }}
            />
          </label>

          <label
            style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
          >
            <span
              style={{
                fontSize: "0.85rem",
                color: "#cbd5e1",
                fontWeight: "700",
              }}
            >
              Vehicle Make / Model
            </span>
            <input
              type="text"
              placeholder="e.g. Hyundai Creta"
              value={form.makeModel}
              onChange={(e) => setForm({ ...form, makeModel: e.target.value })}
              style={{
                padding: "0.8rem",
                borderRadius: "8px",
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                color: "#ffffff",
              }}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "0.5rem",
              padding: "0.9rem",
              background: "linear-gradient(135deg, #f97316 0%, #eab308 100%)",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "800",
              fontSize: "1rem",
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? "Processing..." : "Register & Generate Tag"}
          </button>
        </form>

        <div
          style={{
            marginTop: "1.5rem",
            textAlign: "center",
            paddingTop: "1rem",
            borderTop: "1px solid #334155",
          }}
        >
          <Link
            href="/dashboard"
            style={{
              color: "#22c55e",
              textDecoration: "none",
              fontWeight: "700",
              fontSize: "0.9rem",
            }}
          >
            Skip Registration → Go Straight to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
