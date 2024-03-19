import mongoose from "mongoose";

const ideaSchema = mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["marriage_idea", "gift_idea", "photo_idea"],
      default: "marriage_idea",
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
  },
  { timestamps: true }
);

ideaSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const ideaModel = mongoose.model("Idea", ideaSchema);

export default ideaModel;
