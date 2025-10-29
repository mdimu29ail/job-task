import mongoose from 'mongoose';

const connectMongoDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

export default connectMongoDB;
