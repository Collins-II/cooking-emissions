import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseGlobal {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// Extend NodeJS globalThis to include our custom type
declare global {
  var mongoose: MongooseGlobal | undefined
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export const connectToDatabase = async () => {

  if (!MONGODB_URL) {
    throw new Error('MONGODB_URL is missing');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: 'carbon_calculator',
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
