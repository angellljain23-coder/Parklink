import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Vehicle from "@/lib/models/vehicle";

export async function GET() {
  try {
    await connectToDatabase();
    const vehicles = await Vehicle.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, vehicles });
  } catch (error) {
    console.error("API Vehicles Fetch Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vehicles" },
      { status: 500 },
    );
  }
}
