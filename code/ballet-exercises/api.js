import express from "express";
import mongoose from "mongoose";
import Exercise from "./models/exercise.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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

// get all exercises
app.get("/exercises", async (req, res) => {
  const exercises = await Exercise.find();
  res.json(exercises);
});

