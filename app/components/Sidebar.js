"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ParkLinkLogo from "./ParkLinkLogo";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "🚘 Dashboard & QR", href: "/dashboard" },
    { label: "🎨 Custom QR Studio", href: "/dashboard/qr-studio" },
    { label: "🤝 Connect & Community", href: "/dashboard/community" },
  ];

  return (
    <aside
      style={{
        width: "280px",
        minHeight: "100vh",
        backgroundColor: "#fff", // White clean background
        color: "#111",
        padding: "2rem 1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        borderRight: "1px solid #e2e8f0",
        position: "sticky",
        top: 0,
      }}
    >
      <div>
        {/* ParkLink stylized Logo at the top */}
        <div style={{ padding: "0 1rem", marginBottom: "3rem" }}>
          <ParkLinkLogo size="medium" />
        </div>

        <nav
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "1rem",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: isActive ? "700" : "500",
                  transition: "all 0.2s ease",
                  backgroundColor: isActive
                    ? "rgba(249, 115, 22, 0.08)"
                    : "transparent", // Light orange background for active state
                  color: isActive ? "#f97316" : "#64748b", // Rich orange active text color
                }}
              >
                {isActive && (
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#fbbf24",
                      marginRight: "0.75rem",
                    }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div
        style={{
          borderTop: "1px solid #e2e8f0",
          paddingTop: "1.5rem",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
        }}
      >
        <p
          style={{
            color: "#64748b",
            fontSize: "0.85rem",
            marginBottom: "1rem",
          }}
        >
          Need a different tag?
        </p>
        <Link
          href="/register"
          style={{
            display: "block",
            textAlign: "center",
            padding: "0.9rem",
            background: "linear-gradient(135deg, #f97316 0%, #fbbf24 100%)",
            color: "#fff",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "0.9rem",
            boxShadow: "0 4px 10px rgba(249, 115, 22, 0.2)",
          }}
        >
          + New Vehicle Tag
        </Link>
      </div>
    </aside>
  );
}
