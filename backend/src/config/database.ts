import mongoose from "mongoose";

let isConnected = false;

// Disable Mongoose command buffering so queries don't hang for 10 seconds if disconnected
mongoose.set("bufferCommands", false);

// Setup persistent connection state listeners
mongoose.connection.on("connected", () => {
  isConnected = true;
  console.log(`[Database] MongoDB connected to database: ${mongoose.connection.name}`);
});

mongoose.connection.on("error", (err) => {
  isConnected = false;
  console.error("[Database] MongoDB connection error:", err.message || err);
});

mongoose.connection.on("disconnected", () => {
  isConnected = false;
  console.warn("[Database] MongoDB connection closed.");
});

export const connectDatabase = async (): Promise<boolean> => {
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return true;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn(
      "[Database] MONGODB_URI is not set in environment. Resilient local file storage active."
    );
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      dbName: "sathya",
      serverSelectionTimeoutMS: 2500, // Fail quickly if Atlas IP is not whitelisted or network is down
    });
    isConnected = Boolean(conn.connections[0]?.readyState === 1);
    console.log(`[Database] MongoDB connected: ${conn.connection.host}, database: ${conn.connection.name}`);
    return true;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn("[Database] MongoDB connection unavailable (" + msg + "). Using resilient local storage fallback.");
    isConnected = false;
    return false;
  }
};

export const getDbStatus = (): boolean => {
  return mongoose.connection.readyState === 1;
};
