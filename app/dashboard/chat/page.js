"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";

function ChatContent() {
  const searchParams = useSearchParams();
  const vehicleParam = searchParams.get("vehicle") || "DL 12 AB 1234";

  const [messages, setMessages] = useState([
    {
      sender: "System",
      text: `Direct chat initialized for Vehicle Tag: ${vehicleParam}`,
    },
    {
      sender: "Other Driver",
      text: "Hi, I am parked behind you. Do you need me to move?",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages([...messages, { sender: "You", text: inputText }]);
    setInputText("");
  };

  return (
    <main
      style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1.5rem" }}
    >
      <div
        style={{
          backgroundColor: "#1e293b",
          border: "2px solid #334155",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            backgroundColor: "#0f172a",
            padding: "1rem 1.5rem",
            borderBottom: "1px solid #334155",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3 style={{ margin: 0, color: "#f97316" }}>
              💬 Chat with {vehicleParam}
            </h3>
            <span style={{ fontSize: "0.75rem", color: "#22c55e" }}>
              ● Privacy Protected Channel
            </span>
          </div>
        </div>

        <div
          style={{
            height: "380px",
            overflowY: "auto",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            backgroundColor: "#1e293b",
          }}
        >
          {messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: m.sender === "You" ? "flex-end" : "flex-start",
                backgroundColor: m.sender === "You" ? "#f97316" : "#334155",
                color: "#ffffff",
                padding: "0.75rem 1rem",
                borderRadius: "12px",
                maxWidth: "75%",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  opacity: 0.8,
                  marginBottom: "0.2rem",
                }}
              >
                {m.sender}
              </div>
              <div style={{ fontSize: "0.95rem" }}>{m.text}</div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSend}
          style={{
            display: "flex",
            padding: "1rem",
            backgroundColor: "#0f172a",
            borderTop: "1px solid #334155",
            gap: "0.75rem",
          }}
        >
          <input
            type="text"
            placeholder="Type your reply..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              flex: 1,
              padding: "0.75rem",
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#ffffff",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#22c55e",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "800",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}

export default function ChatPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "#f8fafc",
      }}
    >
      <Navbar />
      <Suspense
        fallback={
          <p style={{ textAlign: "center", padding: "2rem" }}>
            Loading messaging channel...
          </p>
        }
      >
        <ChatContent />
      </Suspense>
    </div>
  );
}
