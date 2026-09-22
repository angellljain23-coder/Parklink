import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true, uppercase: true, trim: true },
  ownerPhone: { type: String, required: true },
  qrHash: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Vehicle ||
  mongoose.model("Vehicle", VehicleSchema);
