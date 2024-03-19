import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
  },
  { timestamps: true }
);

contactSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const contactModel = mongoose.model("Contact", contactSchema);

export default contactModel;
