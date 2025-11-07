import mongoose from 'mongoose';

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return mongoose.connection;
  }

  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }
    
    await mongoose.connect(mongoUri, clientOptions);
    isConnected = true;
    console.log("Successfully connected to MongoDB!");
    
    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      console.log('MongoDB disconnected');
    });
    
    return mongoose.connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

// Initialize connection on module load
if (typeof window === 'undefined') {
  connectToDatabase().catch(console.error);
}