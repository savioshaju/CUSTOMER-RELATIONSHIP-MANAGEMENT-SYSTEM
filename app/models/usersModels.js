import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'user'] }
}, { timestamps: true });

export const User = model("User", userSchema);
