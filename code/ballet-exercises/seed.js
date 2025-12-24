import mongoose from "mongoose"; //connects to mongodb and works with schemas/models
import fs from "fs"; //File System -> reads files from your computer
import Exercise from "./models/exercise.js"; //mongoose model
import "dotenv/config"; //auto loads environment variables (like MONGODB_URI) from '.env'

//Read and parse json file
const raw = JSON.parse( //converts text into js object and result is stored in raw
  fs.readFileSync("./exercises.json", "utf-8") //reads file 'exercises.json' as text
);

//Extract exercise array
const exercises = raw.data;

mongoose.connect(process.env.MONGODB_URI) //connects to mongodb using connection string stored in environment variable MONGODB_URI

//Seed database
  .then(async () => {
    await Exercise.deleteMany(); //deletes all existing exercises in collection
    await Exercise.insertMany(exercises); //inserts all exercises from json file into mongodb in 1 operation
    console.log("Database seeded successfully");
    process.exit(); //stops script once seeding is complete
  })
  .catch(err => {
    console.error(err);
    process.exit(1); //error code
  });
