"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";

export default function DynamicPageRoute({ params: paramsPromise }) {
  // Unwrap params Promise in Next.js 15
  const params = use(paramsPromise);
  const { hash } = params;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/vehicles?identifier=${hash}`)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [hash]);

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#00f2fe" }}>
        <p>Loading vehicle profile...</p>
      </div>
    );
  }

  const plateNumber = data?.vehicle?.plateNumber || hash;

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "24px",
        background: "#0a0f1d",
        border: "1px solid #00f2fe",
        borderRadius: "12px",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#00f2fe", marginBottom: "8px" }}>Vehicle Profile</h2>
      <p
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          margin: "16px 0",
          letterSpacing: "2px",
          background: "#131b2e",
          padding: "12px",
          borderRadius: "8px",
          border: "1px dashed #00f2fe",
        }}
      >
        {plateNumber.toUpperCase()}
      </p>

      <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "24px" }}>
        {data?.type === "QR_SCAN"
          ? "Scanned via QR Tag"
          : "Direct Vehicle Lookup"}
      </p>

      <Link href={`/alert?plate=${encodeURIComponent(plateNumber)}`}>
        <button
          style={{
            width: "100%",
            padding: "12px",
            background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
            color: "#000",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Dispatch Alert to Owner 🚨
        </button>
      </Link>
    </div>
  );
}
