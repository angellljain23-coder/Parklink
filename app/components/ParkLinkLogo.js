"use client";

export default function ParkLinkLogo({ size = "medium", dark = false }) {
  const isLarge = size === "large";
  const textColor = dark ? "#fff" : "#111";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: isLarge ? "0.75rem" : "0.5rem",
        fontFamily: '"Montserrat", "Helvetica Neue", sans-serif',
        textDecoration: "none",
        cursor: "default",
      }}
    >
      {/* The Styled 'P' Icon using a vibrant gradient */}
      <div
        style={{
          width: isLarge ? "48px" : "36px",
          height: isLarge ? "48px" : "36px",
          borderRadius: isLarge ? "12px" : "8px",
          background: "linear-gradient(135deg, #f97316 0%, #fbbf24 100%)", // Orange to Yellow
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "900",
          fontSize: isLarge ? "2rem" : "1.4rem",
          boxShadow: "0 4px 10px rgba(249, 115, 22, 0.3)",
        }}
      >
        P
      </div>

      {/* The "ParkLink" text with 'Link' colored differently */}
      <div
        style={{
          fontSize: isLarge ? "2.2rem" : "1.6rem",
          fontWeight: "800",
          color: textColor,
          letterSpacing: "-1.5px",
          lineHeight: 1,
        }}
      >
        <span style={{ color: "#f97316" }}>Park</span>
        <span style={{ color: "#fbbf24" }}>Link</span>
      </div>
    </div>
  );
}
