import mongoose from "mongoose"; //connects to mongodb and works with schemas/models

//stepSchema – illustration steps
const stepSchema = new mongoose.Schema(
	{
		step: Number,
		title: String,
		description: String,
		imageUrl: String,
	},
	{ _id: false } //prevents mongodb from creating an '_id' for each step -> useful because these steps are embedded objects, not standalone documents
);

//textImageSchema – dont's and tips -> reusable text + image blocks
const textImageSchema = new mongoose.Schema(
	{
		text: String,
		imageUrl: String,
	},
	{ _id: false } //prevents mongodb from creating an '_id' for each step -> useful because these steps are embedded objects, not standalone documents
);

//exerciseSchema – main exercise structure
const exerciseSchema = new mongoose.Schema({
	title: String,
	mainImg: String,
	category: String,
	difficulty: Number,

	explanation: {
		description: String,
		focus: String,
	},

	//each array uses schemas defined earlier
	illustrationSteps: [stepSchema],
	tutorialVideo: String,
	donts: [textImageSchema],
	tips: [textImageSchema],
});

//Create and export model
//creates a mongoose model named Exercise using schema
//mongodb collection will be named exercises
//exported so it can be used in routes
export default mongoose.model("Exercise", exerciseSchema);
