import { MongoClient, ServerApiVersion, Db } from 'mongodb';

const uri =process.env.MONGODB_URI!;
console.log(uri);

const clientOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let cached = global.mongodb;

if (!cached) {
  cached = global.mongodb = { client: null, promise: null };
}

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cached.client) {
    return { client: cached.client, db: cached.client.db() };
  }

  if (!cached.promise) {
    cached.promise = MongoClient.connect(uri, clientOptions);
  }

  try {
    cached.client = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return { client: cached.client, db: cached.client.db() };
}

declare global {
  var mongodb: {
    client: MongoClient | null;
    promise: Promise<MongoClient> | null;
  };
}