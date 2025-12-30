import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image?: string;
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

// Indexes for performance optimization
BlogSchema.index({ slug: 1, published: 1 }); // For findOne queries
BlogSchema.index({ published: 1, publishedAt: -1 }); // For listing queries
BlogSchema.index({ category: 1, published: 1 }); // For category filtering

export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

