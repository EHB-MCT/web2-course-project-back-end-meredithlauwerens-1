import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
    required: true,
    unique: true
  }
});

export default mongoose.model("Favorite", favoriteSchema);
