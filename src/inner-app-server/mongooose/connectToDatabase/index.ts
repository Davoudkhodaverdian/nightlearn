import mongoose from 'mongoose';

async function connectToDatabase() {

  if (mongoose?.connection?.readyState === 1) {
    console.log("Already connected to MongoDB!");
    return;
  }
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/nightlearn-backend';
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  //mongoose.set('strictQuery', false);
  mongoose.Promise = global.Promise;
  mongoose.connect(MONGODB_URI, { autoIndex: true }).then((mongoose) => {
    console.log("connected to MongoDB!");
    return mongoose;
  }).catch((err => {
    throw err;
  }));

}
export default connectToDatabase;

