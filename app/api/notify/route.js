import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Vehicle from "../../../lib/models/vehicle";
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const body = await req.json();
    const { qrHash, rawMessage } = body;

    if (!qrHash || !rawMessage) {
      return NextResponse.json(
        { success: false, error: "Missing qrHash or message" },
        { status: 400 },
      );
    }

    // 1. Connect to DB & Find Vehicle
    await connectToDatabase();
    const vehicle = await Vehicle.findOne({ qrHash });

    if (!vehicle) {
      return NextResponse.json(
        { success: false, error: "Vehicle tag not found in database" },
        { status: 404 },
      );
    }

    // 2. Format message with Gemini AI
    let formattedSMS = `[ParkLink Alert]: ${rawMessage}`;

    if (process.env.GEMINI_API_KEY) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `Reformat this raw parking issue into a polite, concise SMS (max 140 chars) for the car owner: "${rawMessage}"`,
        });

        if (response.text) {
          formattedSMS = `[ParkLink Alert]: ${response.text.trim()}`;
        }
      } catch (aiErr) {
        console.warn("Gemini AI Warning (Using fallback text):", aiErr.message);
      }
    }

    // 3. Demo Mode Logging (Simulates SMS Delivery)
    console.log("\n==========================================");
    console.log(`📱 [DEMO SMS DELIVERED TO ${vehicle.ownerPhone}]`);
    console.log(`💬 Message: "${formattedSMS}"`);
    console.log("==========================================\n");

    return NextResponse.json({
      success: true,
      message: "Notification generated & sent successfully!",
    });
  } catch (error) {
    console.error("API Notify Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
