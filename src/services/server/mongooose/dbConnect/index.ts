import mongoose from 'mongoose';

// Cache the connection globally
let cached = (global as any).mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) {
    console.log("Already connected to MongoDB!");
    return cached.conn;
  }
  if (mongoose?.connection?.readyState === 1) {
    console.log("Already connected to MongoDB!");
    return;
  }
  if (!cached.promise) {

    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/nightlearn-backend';
    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    }

    //mongoose.set('strictQuery', false);
    mongoose.Promise = global.Promise;
    cached.promise = mongoose.connect(MONGODB_URI, { autoIndex: true }).then((mongoose) => {
      return mongoose;
    }).catch((err => {
      throw err;
    }));

  }
  cached.conn = await cached.promise;
  return cached.conn;
}
export default dbConnect;

// Save to global to persist in hot-reloading
(global as any).mongoose = cached;
