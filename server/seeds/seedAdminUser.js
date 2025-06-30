import bcrypt from "bcryptjs";
import { User } from "../models/User.js";

const seedAdminUser = async () => {
  const existingAdmin = await User.findOne({ username: "admin" });
  if (existingAdmin) {
    console.log("Admin user already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const adminUser = new User({
    username: "admin",
    password: hashedPassword,
    role: "admin"
  });

  await adminUser.save();
  console.log("Default admin user created.");
};

export default seedAdminUser;
