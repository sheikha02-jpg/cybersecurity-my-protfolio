import mongoose from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  console.warn("⚠️  MONGODB_URI not found in environment variables.");
  console.warn("⚠️  Please create .env.local file with MONGODB_URI");
  console.warn("⚠️  Database features will not work until MongoDB is configured.");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured. Please add it to .env.local");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e: any) {
    cached.promise = null;
    // Don't throw error, just log it - allows site to work without MongoDB
    console.error("MongoDB connection error:", e.message);
    console.error("💡 Tip: Install MongoDB locally or use MongoDB Atlas (free cloud option)");
    throw new Error(`MongoDB connection failed: ${e.message}. Please check your MONGODB_URI in .env.local or install MongoDB.`);
  }

  return cached.conn;
}

export default connectDB;

