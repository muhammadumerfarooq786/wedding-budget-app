import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 255,
    },
    description: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
  },
  { timestamps: true }
);

eventSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const eventModel = mongoose.model("Event", eventSchema);

export default eventModel;
