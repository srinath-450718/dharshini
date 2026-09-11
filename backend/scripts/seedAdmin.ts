import dotenv from "dotenv";
import path from "path";
import { connectDatabase } from "../src/config/database.js";
import { initAdminUser } from "../src/utils/initAdmin.js";

// Load environment variables
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), "backend/.env") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

async function runSeed() {
  console.log("Connecting to MongoDB for admin seeding...");
  const connected = await connectDatabase();
  if (!connected) {
    console.error("Could not connect to MongoDB. Check MONGODB_URI.");
    process.exit(1);
  }

  await initAdminUser();
  console.log("Admin seeding process completed.");
  process.exit(0);
}

runSeed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
