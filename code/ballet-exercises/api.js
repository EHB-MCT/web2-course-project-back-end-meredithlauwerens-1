import express from "express"; //web server framework
import mongoose from "mongoose"; //connects to mongodb and works with schemas/models
import Exercise from "./models/exercise.js"; //mongoose model
import cors from "cors"; //allows cross origin requests
import path from "path"; //hadnels file paths
import dotenv from "dotenv"; //loads environment variables from '.env'
import Favorite from "./models/favorites.js"; //mongoose model

dotenv.config();

//App initialization
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); //parses json request bodies
app.use(cors()); //allows requests from other origins

//serves static files from images and videos folders (Example: /images/pic.jpg -> serves ./images/pic.jpg.)
app.use("/images", express.static(path.join(process.cwd(), "images")));
app.use("/videos", express.static(path.join(process.cwd(), "videos")));

//Connect to mongodb
mongoose
	.connect(process.env.MONGODB_URI) //connects to mongodb using URI in '.env'
	.then(() => {
		console.log("Connected to MongoDB Atlas");
	})
	.catch((err) => {
		console.error("MongoDB connection error:", err.message); //logs success or failure
	});

//simple root route to confirm backend is running
app.get("/", (req, res) => {
	res.json({ message: "Backend running with MongoDB" });
});

//get all exercises
//fetches all exercises from mongodb and returns json
app.get("/exercises", async (req, res) => {
	const exercises = await Exercise.find();
	res.json(exercises);
});

//get exercise by id
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

//get all favorites
app.get("/favorites", async (req, res) => {
	try {
		const favorites = await Favorite.find().populate("exercise"); //replaces exercise id with full exercise document
		res.json(favorites);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

//add favorite
app.post("/favorites", async (req, res) => {
	try {
		const { exerciseId } = req.body; //receives 'exerciseId' in request body
		const favorite = new Favorite({ exercise: exerciseId }); //creates a new favorite document
		await favorite.save();
		res.status(201).json({ message: "Favorite saved" });
	} catch (err) {
		if (err.code === 11000) {
			return res.status(400).json({ error: "Already favorited" });
		}
		res.status(500).json({ error: err.message });
	}
});

//delete favorized exercise
app.delete("/favorites/:exerciseId", async (req, res) => {
	try {
		await Favorite.findOneAndDelete({
			exercise: req.params.exerciseId,
		});

		res.json({ message: "Favorite removed" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`);
});
