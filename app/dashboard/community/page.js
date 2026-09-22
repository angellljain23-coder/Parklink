"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function CommunityPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Delhi Traffic Watch",
      tag: "Alert",
      content:
        "Heavy parking congestion near Connaught Place Block B. Avoid double parking.",
      time: "10m ago",
      likes: 14,
    },
    {
      id: 2,
      author: "Rajesh M.",
      tag: "Discussion",
      content:
        "Anyone facing issues with unauthorized parking in Sector 62 residential blocks?",
      time: "1h ago",
      likes: 8,
    },
  ]);
  const [newPost, setNewPost] = useState("");

  const handlePost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    setPosts([
      {
        id: Date.now(),
        author: "You (Driver)",
        tag: "Update",
        content: newPost,
        time: "Just now",
        likes: 0,
      },
      ...posts,
    ]);
    setNewPost("");
  };

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
          maxWidth: "800px",
          margin: "0 auto",
          padding: "2.5rem 1.5rem",
        }}
      >
        <h1
          style={{ color: "#f97316", margin: "0 0 0.5rem", fontSize: "2rem" }}
        >
          🤝 Parking Community
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
          Real-time updates, traffic notices, and parking discussions.
        </p>

        {/* Post Form */}
        <form
          onSubmit={handlePost}
          style={{
            backgroundColor: "#1e293b",
            border: "2px solid #334155",
            borderRadius: "16px",
            padding: "1.25rem",
            marginBottom: "2rem",
          }}
        >
          <textarea
            rows={3}
            placeholder="Share a parking update or ask the community..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "8px",
              padding: "0.8rem",
              color: "#ffffff",
              resize: "vertical",
            }}
          />
          <button
            type="submit"
            style={{
              marginTop: "0.75rem",
              padding: "0.6rem 1.25rem",
              backgroundColor: "#22c55e",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "800",
              cursor: "pointer",
            }}
          >
            Post Update
          </button>
        </form>

        {/* Post List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "12px",
                padding: "1.25rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ fontWeight: "700", color: "#eab308" }}>
                  {post.author}
                </span>
                <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                  {post.time}
                </span>
              </div>
              <p
                style={{
                  margin: "0 0 1rem",
                  color: "#e2e8f0",
                  lineHeight: "1.5",
                }}
              >
                {post.content}
              </p>
              <button
                onClick={() => post.likes++}
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #334155",
                  color: "#f97316",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "6px",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                👍 Helpful ({post.likes})
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
