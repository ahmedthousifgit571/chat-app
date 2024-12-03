import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'
const app = express();

dotenv.config();

const PORT = process.env.PORT;

import { connectDB } from "./lib/db.js";

// folder imports
import authRoutes from "./routes/auth.route.js";

// middlewares
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("server running on port :" + PORT);
  connectDB();
});
