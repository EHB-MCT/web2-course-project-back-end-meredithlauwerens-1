import express from "express";
import mongoose from "mongoose";
import Exercise from "./models/exercise.js";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import Favorite from "./models/Favorite.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/images", express.static(path.join(process.cwd(), "images")));
app.use("/videos", express.static(path.join(process.cwd(), "videos")));


mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("Connected to MongoDB Atlas");
	})
	.catch((err) => {
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

app.get("/exercises/:id", async (req, res) => {
	try {
		const exercise = await Exercise.findById(req.params.id);
		if (!exercise) {
			return res.status(404).json({ error: "Exercise not found" });
		}
		res.json(exercise);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get("/test", async (req, res) => {
	try {
		const exercises = await Exercise.find();
		console.log("Exercises in DB:", exercises.length);
		res.json(exercises);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
});

app.get("/favorites", async (req, res) => {
  try {
    const favorites = await Favorite.find().populate("exercise");
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/favorites", async (req, res) => {
  try {
    const { exerciseId } = req.body;

    const favorite = new Favorite({ exercise: exerciseId });
    await favorite.save();

    res.status(201).json({ message: "Favorite saved" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Already favorited" });
    }
    res.status(500).json({ error: err.message });
  }
});

app.delete("/favorites/:exerciseId", async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      exercise: req.params.exerciseId
    });

    res.json({ message: "Favorite removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`);
});
