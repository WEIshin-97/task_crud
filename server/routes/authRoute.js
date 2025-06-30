import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";;
const router = express.Router();

router.post("/register", async (req, res) => {

  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser){
      return res.status(401).json({ message: "User exist" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ 
      username, 
      password: hashed 
    });

    await user.save();
    return res.status(200).json({ message: "User created" });

  } catch (err) {
    console.error("Error register:", err.message);
    return res.status(500).json({ message: "Server error: "+ err.message });
  }

});

router.post("/login", async (req, res) => {

  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))){
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    const token = jwt.sign({ 
      id: user._id, 
      username: user.username, 
      role: user.role 
    }, process.env.JWT_SECRET);

    return res.status(200).json({ token });

  } catch (err) {
    console.error("Error login:", err.message);
    return res.status(500).json({ message: "Server error: "+ err.message });
  }
});

export default router;
