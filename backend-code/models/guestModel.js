import mongoose from "mongoose";

const guestSchema = mongoose.Schema(
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
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
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

guestSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const guestModel = mongoose.model("Guest", guestSchema);

export default guestModel;
