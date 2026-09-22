"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ParkLinkLogo from "./ParkLinkLogo";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "📊 Dashboard", href: "/dashboard" },
    { label: "🚨 Scan & Alert", href: "/alert" },
    { label: "👥 Friends", href: "/dashboard/friends" },
    { label: "🎨 QR Studio", href: "/dashboard/qr-studio" },
    { label: "🤝 Community", href: "/dashboard/community" },
    { label: "💬 Messages", href: "/dashboard/chat" },
  ];

  return (
    <header
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0.85rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          <ParkLinkLogo size="medium" dark={true} />
        </Link>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            flexWrap: "wrap",
          }}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: "0.5rem 0.85rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: isActive ? "800" : "600",
                  color: isActive ? "#ffffff" : "#cbd5e1",
                  backgroundColor: isActive ? "#f97316" : "transparent",
                  boxShadow: isActive
                    ? "0 4px 15px rgba(249, 115, 22, 0.4)"
                    : "none",
                  transition: "all 0.2s ease",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/register"
          style={{
            padding: "0.55rem 1.1rem",
            background: "linear-gradient(135deg, #f97316 0%, #eab308 100%)",
            color: "#ffffff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "800",
            fontSize: "0.85rem",
            boxShadow: "0 4px 15px rgba(249, 115, 22, 0.4)",
          }}
        >
          + Register Tag
        </Link>
      </div>
    </header>
  );
}
