# ⚡ ParkLink — AI-Powered Anonymous Vehicle Contact System

> **A real-time, privacy-first platform enabling seamless driver notifications and voice connections via AI license plate OCR and WebRTC.**

---

## 🚀 Overview

**ParkLink** bridges the gap between vehicle owners and the public without sacrificing personal privacy. Whether a car is blocking a driveway, has its headlights left on, or is parked illegally, ParkLink allows anyone to instantly dispatch an alert or initiate an anonymous voice call by simply scanning a license plate or QR tag.

---

## ✨ Key Features

* **⚡ AI Vehicle Plate Scanner**: Real-time license plate detection powered by Tesseract.js directly inside the browser.
* **🚨 Direct Alert Dispatcher**: Select preset hazard scenarios (*Blocking Driveway*, *Flat Tire*, *Lights On*) or send custom notes with designated urgency levels.
* **📞 Anonymous WebRTC Voice Calling**: Establish secure, peer-to-peer audio calls between drivers and citizens using PeerJS without revealing phone numbers.
* **📱 Dynamic QR Vehicle Tags**: Generate downloadable, toggleable QR codes for registered vehicles so passersby can notify owners on the fly.
* **💎 Cyberpunk / Glassmorphism UI**: High-impact, pitch-ready dark theme (`#050810`) featuring cyan/magenta glowing accents and responsive stat dashboards.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 15 (App Router)
* **Styling**: Modern CSS3 (Glassmorphism, CSS Variables, Flex/Grid Layouts)
* **OCR & Computer Vision**: Tesseract.js
* **Real-time Voice**: WebRTC (PeerJS)
* **Database**: MongoDB (Mongoose)
* **QR Generation**: `qrcode.react`
* **Version Control & Hosting**: GitHub & Vercel

---

## 📂 Project Structure

```text
parklink/
├── app/
│   ├── alert/            # Dispatch alert page & urgency selection
│   ├── api/              # Serverless API routes (vehicles, alerts, notifications)
│   ├── components/       # Scanner, WebRTC Modal, Navbar, Logo components
│   ├── dashboard/        # Main hub (Stats overview & Registered vehicles management)
│   ├── register/         # Vehicle registration workflow
│   ├── globals.css       # Theme definitions, gradients, and glassmorphism styling
│   └── page.js           # Landing page
├── lib/                  # MongoDB utility connections and Mongoose models
└── public/               # Static assets & icons
