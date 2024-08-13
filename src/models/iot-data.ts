import mongoose, { Document, Schema } from "mongoose";

export interface IIoTData extends Document {
  deviceId: string;
  timestamp: Date;
  batteryLevel: number;
  location: {
    lat: number;
    long: number;
  };
  status: "active" | "inactive";
}

const IoTDataSchema: Schema = new Schema({
  deviceId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  batteryLevel: { type: Number, required: true },
  location: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  status: { type: String, enum: ["active", "inactive"], required: true },
});

export default mongoose.model<IIoTData>("IoTData", IoTDataSchema);
