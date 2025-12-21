import mongoose from "mongoose";
import fs from "fs";
import Exercise from "./models/exercise.js";

const raw = JSON.parse(
  fs.readFileSync("./exercises.json", "utf-8")
);

//IMPORTANT: extract the array
const exercises = raw.data;

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    await Exercise.deleteMany();
    await Exercise.insertMany(exercises);
    console.log("Database seeded successfully");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
