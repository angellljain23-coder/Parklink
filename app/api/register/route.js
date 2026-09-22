import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Vehicle from "@/lib/models/vehicle";
import crypto from "crypto";

export async function POST(req) {
  try {
    const body = await req.json();

    // Map any incoming name variant to vehicleNumber
    const vehicleNumber = body.vehicleNumber || body.plateNumber || body.plate;
    const ownerPhone = body.ownerPhone || body.phone;
    const makeModel = body.makeModel || body.model || "";

    if (!vehicleNumber || !ownerPhone) {
      return NextResponse.json(
        {
          success: false,
          error: "Vehicle number and phone number are required.",
        },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const qrHash = crypto.randomBytes(4).toString("hex");

    const newVehicle = await Vehicle.create({
      vehicleNumber, // Matches your Mongoose Schema field!
      ownerPhone,
      makeModel,
      qrHash,
    });

    return NextResponse.json({
      success: true,
      vehicle: newVehicle,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to register vehicle" },
      { status: 500 },
    );
  }
}
