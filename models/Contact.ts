import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  read: boolean;
}

const ContactSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Indexes for performance optimization
ContactSchema.index({ createdAt: -1 }); // For admin listing (most recent first)
ContactSchema.index({ read: 1, createdAt: -1 }); // For unread messages

export default mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

