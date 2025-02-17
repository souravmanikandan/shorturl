import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database Connected');
  } catch (err) {
    console.error('Database Connection Error:', err.message);
    process.exit(1);
  }
};

export default connectDB;
