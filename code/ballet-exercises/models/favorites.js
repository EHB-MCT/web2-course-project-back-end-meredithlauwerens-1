import mongoose from "mongoose"; //connects to mongodb and works with schemas/models

//Create the schema
//defines structure of a Favorite document in mongodb
const favoriteSchema = new mongoose.Schema({
  exercise: {
    type: mongoose.Schema.Types.ObjectId, //stores a mongodb 'ObjectId' -> references another document
    ref: "Exercise", //tells mongoose that this 'ObjectId' refers to Exercise model -> enables '.populate("exercise")' to fetch full exercise details later
    required: true, //every favorite must be linked to an exercise -> prevents saving a favorite without an exercise
    unique: true //ensures same exercise can only be favorited once -> prevents duplicate favorites for same exercise
  }
});

//Create and export model
//creates a mongoose model named Favorite using schema
//mongodb collection will be named favorites (lowercase + plural)
//exported so it can be used in routes
export default mongoose.model("Favorite", favoriteSchema);
