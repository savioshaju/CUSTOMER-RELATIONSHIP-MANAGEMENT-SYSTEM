import mongoose, { Schema, model } from "mongoose";

const caseSchema = new Schema({
  customer_id: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  assigned_to: { type: Schema.Types.ObjectId, ref: "User", required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { type: String, enum: ['open', 'in_progress', 'closed'], default: 'open' },
  created_at: { type: Date, default: Date.now }
}, { timestamps: true });

export const Case = model("Case", caseSchema);
