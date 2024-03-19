import mongoose from "mongoose";

const budgetSchema = mongoose.Schema(
  {
    eventid: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 255,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["incomplete", "complete"],
      default: "incomplete",
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
  },
  { timestamps: true }
);

budgetSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const budgetModel = mongoose.model("Budget", budgetSchema);

export default budgetModel;
