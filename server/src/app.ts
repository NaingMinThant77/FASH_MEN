import express, { json } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db/dbConnect";
import errorHandler from "./middlewares/errorHandler";

dotenv.config({
  path: "./.env",
});

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(json());
app.use(cookieParser());

// routes
import userRoutes from "./routes/user";
app.use("/api/", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || "8000";
app.listen(PORT, () => {
  // database connection
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
