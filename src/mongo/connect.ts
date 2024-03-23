import mongoose from 'mongoose';

async function connectDB(url: string) {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect with MongoDB');
    console.error(err);
  }
}

export default connectDB;
