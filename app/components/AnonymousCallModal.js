"use client";

import { useState, useEffect, useRef } from "react";

export default function AnonymousCallModal({ vehicleHash, onClose }) {
  const [callStatus, setCallStatus] = useState(
    "Initializing secure channel...",
  );
  const [isCalling, setIsCalling] = useState(false);
  const [peer, setPeer] = useState(null);
  const localAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);

  useEffect(() => {
    let peerInstance;

    // Dynamically import PeerJS (client-side only)
    import("peerjs").then(({ default: Peer }) => {
      peerInstance = new Peer();

      peerInstance.on("open", (id) => {
        setPeer(peerInstance);
        setCallStatus("Encrypted Proxy Connected. Ready to Call.");
      });

      peerInstance.on("error", () => {
        setCallStatus("Call channel unavailable.");
      });
    });

    return () => {
      if (peerInstance) peerInstance.destroy();
    };
  }, []);

  const startVoiceCall = async () => {
    if (!peer) return;

    try {
      setCallStatus("Requesting microphone access...");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      if (localAudioRef.current) {
        localAudioRef.current.srcObject = stream;
      }

      setIsCalling(true);
      setCallStatus(
        `Ringing Vehicle Tag Owner (${vehicleHash.substring(0, 6)}...)...`,
      );

      // Initiate WebRTC Call to the target room
      const targetPeerId = `parklink-owner-${vehicleHash}`;
      const call = peer.call(targetPeerId, stream);

      call.on("stream", (remoteStream) => {
        setCallStatus("Connected • Voice Encrypted");
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStream;
        }
      });

      call.on("close", () => {
        setCallStatus("Call Ended");
        setIsCalling(false);
      });
    } catch (err) {
      setCallStatus("Microphone access required to initiate call.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
    >
      <div
        className="glass-card"
        style={{
          maxWidth: "420px",
          width: "100%",
          padding: "2rem",
          borderRadius: "24px",
          textAlign: "center",
          border: "1px solid rgba(56, 189, 248, 0.3)",
        }}
      >
        <div
          style={{
            fontSize: "3rem",
            margin: "0 auto 1rem",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "rgba(56, 189, 248, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          📞
        </div>

        <h3
          style={{ margin: "0 0 0.5rem", color: "#ffffff", fontSize: "1.4rem" }}
        >
          Anonymous Voice Call
        </h3>

        <p
          style={{
            color: "#4ade80",
            fontSize: "0.8rem",
            fontWeight: "700",
            marginBottom: "1.5rem",
          }}
        >
          🔒 Phone Numbers Masked & Protected
        </p>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "0.9rem",
            minHeight: "40px",
            marginBottom: "1.5rem",
          }}
        >
          {callStatus}
        </p>

        <audio ref={localAudioRef} autoPlay muted style={{ display: "none" }} />
        <audio ref={remoteAudioRef} autoPlay style={{ display: "none" }} />

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {!isCalling ? (
            <button
              onClick={startVoiceCall}
              disabled={!peer}
              style={{
                padding: "0.9rem",
                backgroundColor: "#22c55e",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                fontWeight: "800",
                fontSize: "1rem",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(34, 197, 94, 0.4)",
              }}
            >
              Connect Call Now
            </button>
          ) : (
            <button
              onClick={onClose}
              style={{
                padding: "0.9rem",
                backgroundColor: "#ef4444",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                fontWeight: "800",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              End Call
            </button>
          )}

          <button
            onClick={onClose}
            style={{
              padding: "0.75rem",
              backgroundColor: "transparent",
              color: "#94a3b8",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
