"use client";

import { useState, useRef } from "react";
import { createWorker } from "tesseract.js";

export default function Scanner({ onPlateDetected }) {
  const [isScanning, setIsScanning] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      setIsScanning(true);
      setLoadingText("Initializing Camera...");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setLoadingText("Align License Plate & Click Capture");
    } catch (err) {
      alert("Camera access denied or unavailable.");
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsScanning(false);
  };

  const captureAndExtract = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setLoadingText("⚡ Processing image with AI OCR...");
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas image to worker
    const imageData = canvas.toDataURL("image/png");
    const worker = await createWorker("eng");

    // Filter recognition strictly to alphanumeric characters
    await worker.setParameters({
      tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    });

    const {
      data: { text },
    } = await worker.recognize(imageData);
    await worker.terminate();

    // Clean up extracted string (remove spaces and special chars)
    const cleanedText = text.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

    stopCamera();

    if (cleanedText) {
      onPlateDetected(cleanedText);
    } else {
      alert(
        "Could not clearly read license plate. Please re-align or enter manually.",
      );
    }
  };

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      {!isScanning ? (
        <button
          type="button"
          onClick={startCamera}
          style={{
            width: "100%",
            padding: "0.85rem",
            background: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "12px",
            fontWeight: "800",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            boxShadow: "0 4px 15px rgba(14, 165, 233, 0.3)",
          }}
        >
          📷 Scan License Plate with AI Camera
        </button>
      ) : (
        <div
          className="glass-card"
          style={{ padding: "1rem", borderRadius: "16px", textAlign: "center" }}
        >
          <p
            style={{
              color: "#38bdf8",
              fontWeight: "700",
              fontSize: "0.9rem",
              marginBottom: "0.75rem",
            }}
          >
            {loadingText}
          </p>
          <div
            style={{
              position: "relative",
              width: "100%",
              overflow: "hidden",
              borderRadius: "12px",
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{ width: "100%", maxHeight: "260px", objectFit: "cover" }}
            />
          </div>
          <canvas ref={canvasRef} style={{ display: "none" }} />

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
            <button
              type="button"
              onClick={captureAndExtract}
              style={{
                flex: 1,
                padding: "0.75rem",
                backgroundColor: "#22c55e",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "800",
                cursor: "pointer",
              }}
            >
              ⚡ Extract Number
            </button>
            <button
              type="button"
              onClick={stopCamera}
              style={{
                padding: "0.75rem 1.25rem",
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                color: "#f87171",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                borderRadius: "8px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
