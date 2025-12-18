import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

//connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB connection error:", err));

//test route
app.get("/", (req, res) => {
  res.json({ message: "Backend + MongoDB connected" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
