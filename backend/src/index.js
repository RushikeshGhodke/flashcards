import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql";
import ApiError from "./utils/ApiErrors.js";
import cardRoute from "./routes/card.routes.js";
import { connection } from "./db/index.js";

// Load environment variables
dotenv.config({ path: "./.env" });

// Create an instance of express
const app = express();

// Middleware setup
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes setup
app.use("/api/v1/card", cardRoute);

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error(new ApiError(500, "DB ERROR::Connection to Database failed."));
    process.exit(1); 
  } else {
    console.log("Connected to the database as ID " + connection.threadId);
  }
});
