import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/connectDB.js";
import User from "../modules/users/users.model.js";

const createAdminUser = async () => {
  try {
    await connectDB();

    const adminEmail = "admin@propertypulse.com";
    const adminPassword = "admin123";
    const adminName = "System Administrator";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin user already exists!");
      console.log(`Email: ${adminEmail}`);
      console.log(`Role: ${existingAdmin.role}`);
      process.exit(0);
    }

    // Create admin user
    const adminUser = await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: "admin",
      isActive: true,
    });

    console.log("✅ Admin user created successfully!");
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log(`Role: ${adminUser.role}`);
    console.log(
      "\n🚀 You can now access the admin panel at: http://localhost:5173/admin"
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
    process.exit(1);
  }
};

createAdminUser();
