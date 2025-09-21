import { Schema } from "mongoose";
import { model } from "mongoose";
const customerSchema = new Schema({
  name: { type: String, required: true },
  contact_info: {
    email: { type: String },
    phone: { type: String },
    address: { type: String }
  },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

export const Customer = model("Customer", customerSchema);
