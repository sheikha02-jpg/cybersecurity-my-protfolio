import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  content?: string;
  tools: string[];
  category: string;
  image?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    content: { type: String },
    tools: [{ type: String }],
    category: { type: String, required: true },
    image: { type: String },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Indexes for performance optimization
ProjectSchema.index({ slug: 1, published: 1 }); // For findOne queries
ProjectSchema.index({ published: 1, createdAt: -1 }); // For listing queries
ProjectSchema.index({ category: 1, published: 1 }); // For category filtering

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

