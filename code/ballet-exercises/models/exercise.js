import mongoose from "mongoose";

const stepSchema = new mongoose.Schema({
  step: Number,
  title: String,
  description: String,
  imageUrl: String
}, { _id: false });

const textImageSchema = new mongoose.Schema({
  text: String,
  imageUrl: String
}, { _id: false });

const exerciseSchema = new mongoose.Schema({
  title: String,
  category: String,
  difficulty: Number,

  explanation: {
    description: String,
    focus: String
  },

  illustrationSteps: [stepSchema],
  tutorialVideo: String,
  donts: [textImageSchema],
  tips: [textImageSchema]
});

export default mongoose.model("Exercise", exerciseSchema);
