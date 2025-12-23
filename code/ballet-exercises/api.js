import express from "express";
import mongoose from "mongoose";
import Exercise from "./models/exercise.js";
import cors from "cors";
import path from "path";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/images", express.static(path.join(process.cwd(), "images")));


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Backend running with MongoDB" });
});

//get all exercises
app.get("/exercises", async (req, res) => {
  const exercises = await Exercise.find();
  res.json(exercises);
});

