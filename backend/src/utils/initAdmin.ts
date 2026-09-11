import bcrypt from "bcryptjs";
import { User } from "../models/User.js";

export const getAdminConfig = () => {
  const email = (process.env.ADMIN_EMAIL || "yeshuv24@gmail.com").toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || "Kalavathi@312";
  return { email, password };
};

/**
 * Startup-safe initialization:
 * Ensures the admin user exists in MongoDB with a secure bcrypt hash.
 * If the user already exists, it does not create a duplicate.
 * Never logs plain-text password or passwordHash.
 */
export const initAdminUser = async (): Promise<void> => {
  try {
    const { email: normalizedEmail, password: adminPassword } = getAdminConfig();

    const existingUser = await User.findOne({ email: normalizedEmail }).select("+passwordHash");

    if (existingUser) {
      // Check if password hash matches current admin credentials
      const isMatch = await bcrypt.compare(adminPassword, existingUser.passwordHash);
      if (!isMatch || existingUser.role !== "admin") {
        console.log(`[Admin Seed] Updating credentials for existing admin: ${normalizedEmail}`);
        const passwordHash = await bcrypt.hash(adminPassword, 10);
        existingUser.passwordHash = passwordHash;
        existingUser.role = "admin";
        await existingUser.save();
      } else {
        console.log(`[Admin Seed] Admin user ready in MongoDB: ${normalizedEmail}`);
      }
      return;
    }

    console.log(`[Admin Seed] Initializing admin user in MongoDB: ${normalizedEmail}`);
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await User.create({
      email: normalizedEmail,
      passwordHash,
      role: "admin",
    });
    console.log(`[Admin Seed] Admin user successfully created in MongoDB: ${normalizedEmail}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[Admin Seed] Notice: Admin initialization check: ${msg}`);
  }
};
