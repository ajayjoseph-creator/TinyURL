import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import urlRoutes from "./routes/URLroute.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: "https://tiny-url-eight.vercel.app"
}));
app.use(bodyParser.json());
app.use("/", urlRoutes);



const PORT = process.env.PORT 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

