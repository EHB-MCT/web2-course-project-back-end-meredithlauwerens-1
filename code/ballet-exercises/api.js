import express from "express";
import mongoose from "mongoose";
import Exercise from "./models/exercise.js";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/images", express.static(path.join(process.cwd(), "images")));


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
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
  const baseUrl = "https://web2-course-project-back-end-85ok.onrender.com";

  const exercisesWithFullImagePaths = exercises.map(ex => {
    const transformPath = (path) => {
      if (!path) return path;
      return path.startsWith("./images/")
        ? path.replace("./images/", `${baseUrl}/images/`)
        : path;
    };

    return {
      ...ex._doc,
      mainImg: transformPath(ex.mainImg),
      illustrationSteps: ex.illustrationSteps.map(step => ({
        ...step,
        imageUrl: transformPath(step.imageUrl)
      })),
      donts: ex.donts.map(dont => ({
        ...dont,
        imageUrl: transformPath(dont.imageUrl)
      })),
      tips: ex.tips.map(tip => ({
        ...tip,
        imageUrl: transformPath(tip.imageUrl)
      }))
    };
  });

  res.json(exercisesWithFullImagePaths);
});


app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
    });

