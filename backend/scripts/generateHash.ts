import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.log("Usage: npm run generate-hash <your-password>");
  console.log("Example: npm run generate-hash MySuperSecretPassword123");
  process.exit(1);
}

const SALT_ROUNDS = 10;

bcrypt.hash(password, SALT_ROUNDS).then((hash) => {
  console.log("\n==================================================");
  console.log("ADMIN PASSWORD HASH GENERATED SUCCESSFULLY");
  console.log("==================================================");
  console.log("\nCopy this hash into your backend/.env file:");
  console.log(`\nADMIN_PASSWORD_HASH=${hash}\n`);
  console.log("==================================================\n");
});
