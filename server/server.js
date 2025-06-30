import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import seedAdminUser from "./seeds/seedAdminUser.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// console.log("Mongo URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected");
    if (process.env.SEED_ADMIN === "true") {
        seedAdminUser();
    }
    
}).catch((err) => {
    console.error("MongoDB connection error:", err)
});
  
app.use("/api/user", authRoute);
app.use("/api/products", productRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));