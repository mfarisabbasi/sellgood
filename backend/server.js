// Packages Import START
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Packages Import END

// Config Import START
import connectDB from "./configs/db.js";
// Config Import END

// Middleware Import START
import morgan from "morgan";
// Middleware Import END

// Routes Import START
import userRoutes from "./routes/userRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import featuredRoutes from "./routes/featuredRoutes.js";
// Routes Import END

// Basic Inits Start
dotenv.config();

connectDB();

const app = express();
// Basic Inits End

// Middlwares Usage Start
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(cors());

// Middlwares Usage End

// API Start
app.get("/api/dev", (req, res) => {
  console.log(req.session);
  res.send("API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/featured", featuredRoutes);
// API End

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server Running In ${process.env.NODE_ENV} On PORT ${PORT}`)
);
// Server End
